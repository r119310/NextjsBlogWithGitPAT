import React, { cache } from "react";
import '@/styles/post/style.css'
import { getPost } from "@/lib/getposts";
import Link from "next/link";
import PostIndex from "@/components/post/PostIndex";
import { Metadata } from 'next';
import { generateMetadataTemplate } from '@/lib/SEO';
import { siteName } from '@/static/constant';
import Article from "@/components/ArticlePage";
import { Main, SideMDShown } from "@/components/PageLayout";

const getFileContent = cache(async (slug: string) => {
  const decodedSlug = decodeURIComponent(slug);
  const postPath = `${process.env.GIT_POSTS_DIR}/${decodedSlug}.md`
  return await getPost(postPath);
})

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data, content } = await getFileContent(params.slug);

  return generateMetadataTemplate({
    title: `${data.title}`,
    description: `「${siteName}」の投稿`,
    url: `/post/${params.slug}`,
    type: "article",
  });
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { data, content } = await getFileContent(params.slug);

  return <Main>
    <SideMDShown>
      <PostIndex content={content} title={data.title as string} />
      <div className="p-3">
        <div className="hidden md:block">共有</div>
        <div className="flex flex-row gap-3 justify-center">
          <div><Link target="_blank" rel="noopener noreferrer" href={`http://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_URL}/post/${params.slug}&text=${data.title}`}>
            <div className="i-tabler-brand-x bg-gray-500 size-8 hover:bg-gray-700" />
          </Link></div>
          <div><Link target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/sharer.php?u=${process.env.NEXT_PUBLIC_URL}/post/${params.slug}`}>
            <div className="i-tabler-brand-facebook bg-gray-500 size-8 hover:bg-gray-700" />
          </Link></div>
        </div>
      </div>
    </SideMDShown>
    <Article data={data} content={content} />
  </Main>
}