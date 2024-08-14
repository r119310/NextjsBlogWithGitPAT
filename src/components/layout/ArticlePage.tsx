import React from "react";
import '@/styles/post/style.css'
import TagBanner from "@/components/tag/TagBanner";
import DateCard from "@/components/post/DateCard";
import { getSeries } from "@/lib/getPosts";
import { PostData } from "@/static/postType";
import SeriesCard from "../SeriesCard";
import { Issue } from "@/static/issueType";
import { CommentForm, CommentFormNoPosting } from "../post/CommentForm";
import { PostMarkdown } from "../post/MarkdownElements";
import { ExplainingBanner } from "../UserBanner";
import Link from "next/link";

export default async function Article({ data, content, issue, slug }: { data: PostData, content: string, issue?: Issue, slug?: string }) {
  const series = data.series ? await getSeries(data.series) : undefined;

  return <article className="transition-colors bg-white p-8 rounded-3xl w-full md:w-[34rem] lg:w-[44rem] mx-auto xl:m-0 dark:bg-slate-800">
    <div className="flex items-center mb-2">
      <DateCard date={data.date} />
      <h1 className="transition-colors my-4 text-3xl dark:text-white">{data.title}</h1>
    </div>
    <div className="transition-colors flex text-sm text-gray-600 gap-4 flex-wrap dark:text-slate-500">
      {issue && !issue.locked ?
        <Link href="#user-comments" className="underline">
          <span className="transition-colors i-tabler-bubble-filled bg-gray-600 mr-2 size-4 dark:bg-slate-500" />コメント: {issue.comments.length}件
        </Link> : <></>}
    </div>
    {data.tags ?
      <div className="flex flex-wrap gap-3 ml-3 mt-4">
        {data.tags?.map((tag, i) =>
          <TagBanner tag={tag} key={i} />)}
      </div> :
      <></>}
    {series && data.series && slug ?
      <div className="mt-5">
        <SeriesCard
          slug={data.series}
          index={series.posts.findIndex((item) => item.slug === slug)}
        />
      </div> : <></>}
    <PostMarkdown content={content} />
    {issue && slug ?
      issue.state === "closed" ?
        <ExplainingBanner>
          コメントは無効です
        </ExplainingBanner> :
        issue.locked ?
          <CommentFormNoPosting comments={issue.comments} /> :
          <CommentForm comments={issue.comments} slug={slug} /> :
      <></>}
  </article>
}