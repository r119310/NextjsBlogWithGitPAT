import React from "react";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import '@/styles/post/style.css'
import TagBanner from "@/components/tag/TagBanner";
import DateCard from "@/components/post/DateCard";
import { getSeries } from "@/lib/getposts";
import { PostData } from "@/static/postType";
import SeriesCard from "../SeriesCard";
import { Issue } from "@/static/issueType";
import CommentForm from "../post/CommentForm";
import { components } from "../post/MarkdownElements";

export default async function Article({ data, content, issue, slug }: { data: PostData, content: string, issue?: Issue, slug?: string }) {
  const series = data.series ? await getSeries(data.series) : undefined;

  return <article className="bg-white p-8 rounded-3xl w-full md:w-[34rem] lg:w-[44rem] mx-auto xl:m-0">
    <div className="flex items-center mb-2">
      <DateCard date={data.date} />
      <h1 className="my-4 text-3xl">{data.title}</h1>
    </div>
    {data.tags ?
      <div className="flex flex-wrap gap-3 ml-3 mt-4">
        {data.tags?.map((tag, i) =>
          <TagBanner tag={tag} key={i} />)}
      </div> :
      <></>}
    {series ?
      <div className="mt-3">
        <SeriesCard
          slug={data.series as string}
          index={series.posts.findIndex((item) => item.data.title === data.title && item.data.date === data.date)}
        />
      </div> : <></>}
    <div className="markdown">
      <ReactMarkdown components={components} remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
    {issue && slug ?
      issue.locked ?
        <div className="w-full mt-10 py-10 flex items-center text-center justify-center bg-gray-100">コメントは無効です</div> :
        <CommentForm comments={issue.comments} slug={slug} /> :
      <></>}
  </article>
}