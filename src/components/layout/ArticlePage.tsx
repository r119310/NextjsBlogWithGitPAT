import React from "react";
import '@/styles/post/style.css'
import TagBanner from "@/components/tag/TagBanner";
import DateCard from "@/components/post/DateCard";
import { getSeries } from "@/lib/getposts";
import { PostData } from "@/static/postType";
import SeriesCard from "../SeriesCard";
import { Issue } from "@/static/issueType";
import CommentForm from "../post/CommentForm";
import { PostMarkdown } from "../post/MarkdownElements";
import { ExplainingBanner } from "../UserBanner";
import Link from "next/link";

export default async function Article({ data, content, issue, slug }: { data: PostData, content: string, issue?: Issue, slug?: string }) {
  const series = data.series ? await getSeries(data.series) : undefined;

  return <article className="bg-white p-8 rounded-3xl w-full md:w-[34rem] lg:w-[44rem] mx-auto xl:m-0">
    <div className="flex items-center mb-2">
      <DateCard date={data.date} />
      <h1 className="my-4 text-3xl">{data.title}</h1>
    </div>
    <div className="flex text-sm text-gray-600 gap-4 flex-wrap">
      {issue && !issue.locked ?
        <Link href="#user-comments" className="underline">
          <span className="i-tabler-bubble-filled bg-gray-600 mr-2 size-4" />コメント: {issue.comments.length}件
        </Link> : <></>}
    </div>
    {data.tags ?
      <div className="flex flex-wrap gap-3 ml-3 mt-4">
        {data.tags?.map((tag, i) =>
          <TagBanner tag={tag} key={i} />)}
      </div> :
      <></>}
    {series ?
      <div className="mt-5">
        <SeriesCard
          slug={data.series as string}
          index={series.posts.findIndex((item) => item.data.title === data.title && item.data.date === data.date)}
        />
      </div> : <></>}
    <PostMarkdown content={content} />
    {issue && slug ?
      issue.locked ?
        <ExplainingBanner>
          コメントは無効です
        </ExplainingBanner> :
        <CommentForm comments={issue.comments} slug={slug} /> :
      <></>}
  </article>
}