import React, { cache } from "react";
import '@/styles/post/style.css'
import { getPost } from "@/lib/getposts";
import Link from "next/link";
import PostIndex from "@/components/post/PostIndex";
import { Metadata } from 'next';
import { generateMetadataTemplate } from '@/lib/SEO';
import { author, siteName } from '@/static/constant';
import Article from "@/components/layout/ArticlePage";
import { Main, SideMDShown } from "@/components/post/PageLayout";

const getFileContent = cache(async () => {
  const postPath = `${process.env.GIT_PROFILE_PATH}`
  return await getPost(postPath);
})

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getFileContent();

  return generateMetadataTemplate({
    title: `${data.title}`,
    description: `「${siteName}」の投稿者(${author.name})について`,
    url: `/profile`,
    type: "article",
  });
}

export default async function Profile() {
  const { data, content } = await getFileContent();

  return <Main>
    <SideMDShown>
      <PostIndex content={content} title={data.title as string} />
    </SideMDShown>
    <Article data={data} content={content} />
  </Main>
}