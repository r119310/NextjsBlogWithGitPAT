import React, { cache } from "react";
import '@/styles/post/style.css'
import { getPost } from "@/lib/getposts";
import Link from "next/link";
import PostIndex from "@/components/post/PostIndex";
import { Metadata } from 'next';
import { generateMetadataTemplate } from '@/lib/SEO';
import Article from "@/components/layout/ArticlePage";
import { Main, SideMDShown } from "@/components/post/PageLayout";
import ShareButtons from "@/components/ShareButtons";

const getFileContent = cache(async (path: string) => {
  const decodedSlug = decodeURIComponent(path);
  const postPath = `${process.env.GIT_POSTS_DIR}/${decodedSlug}.md`
  return await getPost(postPath);
})

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const { data, excerpt } = await getFileContent(params.slug.join('/'));

  return generateMetadataTemplate({
    title: `${data.title}`,
    description: `${excerpt}`,
    url: `/post/${params.slug.join('/')}`,
    type: "article",
  });
}

export default async function Post({ params }: { params: { slug: string[] } }) {
  const { data, content } = await getFileContent(params.slug.join('/'));

  return <Main>
    <SideMDShown>
      <PostIndex content={content} title={data.title} />
      <div className="p-3">
        <div className="hidden md:block">共有</div>
        <ShareButtons path={`/post/${params.slug.join('/')}`} text={data.title} />
      </div>
    </SideMDShown>
    <Article data={data} content={content} />
  </Main>
}