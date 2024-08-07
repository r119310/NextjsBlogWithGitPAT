import matter from 'gray-matter';
import { cache } from 'react';
import { MarkdownToPlainText } from './markdownConverter';

const getInit = (revalidate: number) => {
  return {
    headers: { "Authorization": `token ${process.env.GIT_TOKEN}` },
    next: { revalidate },
  }
}

const gitContentPath = `https://api.github.com/repos/${process.env.GIT_USERNAME}/${process.env.GIT_REPO}/contents`

const getPostContent = cache(async (path: string) => {
  const fileJson = await fetch(`${gitContentPath}/${path}`,
    getInit(3600)
  ).then(res => res.json()).catch(err => console.error(err))

  const buf = Buffer.from(fileJson.content, 'base64');
  const fileContent = buf.toString("utf-8");
  const { data, content } = matter(fileContent);

  const plainText = await MarkdownToPlainText(content);
  const excerpt = plainText.length >= 128 ? plainText.slice(0, 128) + "..." : plainText;

  return {
    data,
    content,
    excerpt,
  }
})

export const getPostsProps = cache(async () => {
  const data = await fetch(`${gitContentPath}/${process.env.GIT_POSTS_DIR}/`,
    getInit(3600)
  ).then(res => res.json()).catch(err => console.error(err))
  const fileNames = (data as any[]).map((item) => item.name);

  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const { data, excerpt } = await getPostContent(`${process.env.GIT_POSTS_DIR}/${fileName}`);
      return {
        slug: fileName.replace('.md', ''),
        data,
        excerpt,
      };
    })
  )
  return posts;
});

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