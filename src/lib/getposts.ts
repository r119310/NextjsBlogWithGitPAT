import matter from 'gray-matter';
import { cache } from 'react';

export const getPostsProps = cache(async () => {
  const data = await fetch(`https://api.github.com/repos/${process.env.GIT_USERNAME}/${process.env.GIT_REPO}/contents/${process.env.GIT_POSTS_DIR}/`,
    {
      headers: { "Authorization": `token ${process.env.GIT_TOKEN}` },
      next: { revalidate: 3600 * 240 },
    }
  ).then(res => res.json()).catch(err => console.error(err))
  const fileNames = (data as any[]).map((item) => item.name);

  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const fileJson = await fetch(`https://api.github.com/repos/${process.env.GIT_USERNAME}/${process.env.GIT_REPO}/contents/${process.env.GIT_POSTS_DIR}/${fileName}`,
        {
          headers: { "Authorization": `token ${process.env.GIT_TOKEN}` },
          next: { revalidate: 3600 * 240 },
        }
      ).then(res => res.json()).catch(err => console.error(err))

      const buf = Buffer.from(fileJson.content, 'base64');
      const fileContent = buf.toString("utf-8");

      const { data } = matter(fileContent);

      return {
        slug: fileName.replace('.md', ''),
        data,
      };
    })
  )

  return posts
});

export const getPost = cache(async (slug: string) => {
  const fileJson = await fetch(`https://api.github.com/repos/${process.env.GIT_USERNAME}/${process.env.GIT_REPO}/contents/${slug}`,
    {
      headers: { "Authorization": `token ${process.env.GIT_TOKEN}` },
      next: { revalidate: 3600 * 6},
    }
  ).then(res => res.json()).catch(err => console.error(err))

  const buf = Buffer.from(fileJson.content, 'base64');
  const fileContent = buf.toString("utf-8");

  const { data, content } = matter(fileContent);

  return { data, content };
});

export const getImage = cache(async (path: string) => {
  const fileJson = await fetch(`https://api.github.com/repos/${process.env.GIT_USERNAME}/${process.env.GIT_REPO}/contents${path}`,
    {
      headers: { "Authorization": `token ${process.env.GIT_TOKEN}` },
    }
  ).then(res => res.json()).catch(err => console.error(err));

  const imageJson = await fetch(fileJson.git_url,
    {
      headers: { "Authorization": `token ${process.env.GIT_TOKEN}` },
      next: { revalidate: 3600 * 24 },
    }
  ).then(res => res.json()).catch(err => console.error(err));
  return imageJson.content as string;
})