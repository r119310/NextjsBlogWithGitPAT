import matter from 'gray-matter';
import { cache } from 'react';
import { MarkdownToPlainText } from './markdownConverter';
import type { Post, PostData, SeriesData } from '@/static/postType';
import { compareSeriesPosts } from './postSorter';
import { makeExcerpt } from './textFormatter';
import { notFound } from 'next/navigation';

const getInit = (revalidate: number) => {
  return {
    headers: { "Authorization": `token ${process.env.GIT_TOKEN}` },
    next: { revalidate },
  }
}

const gitContentPath = `https://api.github.com/repos/${process.env.GIT_USERNAME!}/${process.env.GIT_REPO!}/contents`

const getPostContent = cache(async (path: string): Promise<{ data: PostData; content: string; excerpt: string }> => {
  const fileJson = await fetch(`${gitContentPath}/${path}`,
    getInit(3600)
  ).then(res => res.json()).catch(err => console.error(err))

  if (fileJson?.message === 'Not Found' || fileJson?.status === 404) {
    notFound();
  }

  const buf = Buffer.from(fileJson.content, 'base64');
  const fileContent = buf.toString("utf-8");
  const { data, content } = matter(fileContent);

  const pathParts = path.split('/');
  const outputData = pathParts.length > 2 ? { ...data, series: pathParts[1] } : data;

  const plainText = await MarkdownToPlainText(content);
  const excerpt = makeExcerpt(plainText, 128);

  return {
    data: outputData as PostData,
    content,
    excerpt,
  }
})

export const getSeriesProps = cache(async () => {
  const targetDir = process.env.GIT_POSTS_DIR as string;
  const data = await fetch(`${gitContentPath}/${targetDir}`,
    getInit(3600)
  ).then(res => res.json()).catch(err => console.error(err));
  const seriesArray = (data as any[])
    .filter((item) => item.type === "dir")
    .map((item) => item.name as string)

  return seriesArray;
});

export const getPostsProps = cache(async (dir?: string): Promise<Post[]> => {
  const targetDir = dir ? `${process.env.GIT_POSTS_DIR}/${dir}` : process.env.GIT_POSTS_DIR as string;
  const data = await fetch(`${gitContentPath}/${targetDir}`,
    getInit(3600)
  ).then(res => res.json()).catch(err => console.error(err));

  const posts: Post[] = [];
  for (const item of data) {
    if (item.type === "file") {
      // ファイルの場合、配列に追加
      const { data, excerpt } = await getPostContent(`${targetDir}/${item.name}`);
      if (data.title) {  // titleを持っていない場合は除外
        posts.push({
          slug: (item.path as string).replace(`${process.env.GIT_POSTS_DIR}/`, "").replace('.md', ''),
          data,
          excerpt,
        });
      }
    } else if (!dir && item.type === "dir") {
      // dir指定なしでディレクトリがあった場合、もう一度fetchし、配列に追加
      const dirContent = await fetch(`${gitContentPath}/${process.env.GIT_POSTS_DIR}/${item.name}`,
        getInit(3600)
      ).then(res => res.json()).catch(err => console.error(err));

      const markdownFiles = (dirContent as any[]).filter((subItem) => subItem.type === "file" && subItem.name.endsWith('.md'));

      for (const subItem of markdownFiles) {
        const { data, excerpt } = await getPostContent(`${process.env.GIT_POSTS_DIR}/${item.name}/${subItem.name}`);
        if (data.title) {  // titleを持っていない場合は除外
          posts.push({
            slug: (subItem.path as string).replace(`${process.env.GIT_POSTS_DIR}/`, "").replace('.md', ''),
            data,
            excerpt,
          });
        }
      }
    }
  }

  return posts;
});

export const getSeries = cache(async (dir: string) => {
  const postsProps = await getPostsProps(dir);
  const targetDir = `${process.env.GIT_POSTS_DIR}/${dir}`;
  const fileJson = await fetch(`${gitContentPath}/${targetDir}/meta.json`,
    getInit(3600)
  ).then(res => res.json()).catch(err => console.error(err));

  let seriesJson: SeriesData;

  if (fileJson?.message === 'Not Found' || fileJson?.status === 404) {
    seriesJson = {
      name: dir
    }
  } else {
    const buf = Buffer.from(fileJson.content, 'base64');
    const fileContent = buf.toString("utf-8");
    seriesJson = JSON.parse(fileContent);
  }

  return {
    posts: postsProps.sort(compareSeriesPosts),
    meta: seriesJson
  }
})

export const getPost = cache(async (path: string) => {
  return await getPostContent(path);
});

export const getImage = cache(async (path: string) => {
  const fileJson = await fetch(`${gitContentPath}${path}`,
    getInit(3600 * 24 * 30)
  ).then(res => res.json()).catch(err => console.error(err));

  const imageJson = await fetch(fileJson.git_url,
    getInit(3600 * 24)
  ).then(res => res.json()).catch(err => console.error(err));
  return imageJson.content as string;
})