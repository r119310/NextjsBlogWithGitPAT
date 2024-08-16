import React, { cache } from "react";
import '@/styles/post/style.css'
import { getPost } from "@/lib/getPosts";
import PostIndex from "@/components/post/PostIndex";
import { Metadata } from 'next';
import { generateMetadataTemplate } from '@/lib/SEO';
import Article from "@/components/layout/ArticlePage";
import { Main, SideMDShown } from "@/components/layout/PageLayout";
import ShareButtons from "@/components/ShareButtons";
import { getCommentList } from "@/lib/commentIssueManager";

const getFileContent = cache(async (path: string) => {
  const postPath = `${process.env.GIT_POSTS_DIR!}/${path}.md`
  return await getPost(postPath);
})

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug.join('/'));
  const { data, excerpt } = await getFileContent(slug);

  return generateMetadataTemplate({
    title: `${data.title}`,
    description: `${excerpt}`,
    url: `/post/${params.slug.join('/')}`,
    imageURL: `/api/ogp-posts/${slug}`,
    type: "article",
  });
}

export default async function Post({ params }: { params: { slug: string[] } }) {
  const slug = decodeURIComponent(params.slug.join('/'));
  const [postContent, issue] = await Promise.all([
    getFileContent(slug),
    getCommentList(slug),
  ]);

  const { data, content } = postContent;

  return <Main>
    <SideMDShown>
      <PostIndex content={content} title={data.title} />
      <div className="p-3">
        <div className="hidden md:block">共有</div>
        <ShareButtons path={`/post/${slug}`} text={data.title} />
      </div>
    </SideMDShown>
    <Article data={data} content={content} issue={issue} slug={slug} />
  </Main>
}