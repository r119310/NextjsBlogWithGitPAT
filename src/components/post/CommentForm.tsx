"use client";
import { Comment } from "@/static/issueType";
import DateCard from "./DateCard";
import { CommentMarkdown } from "./MarkdownElements";
import PostingForm from "./CommentPostingBox";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ExplainingBanner } from "../UserBanner";

export default function CommentForm({ comments, slug }: { comments: Comment[], slug: string }) {
  return <GoogleReCaptchaProvider
    reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
    language="ja">
    <section className="border-t pt-5 mt-10">
      <h2 id="user-comments" className="transition-colors text-[1.5rem] text-blue-900 scroll-mt-16 dark:text-blue-500"><b>コメント</b></h2>
      <div className="flex flex-col gap-4 mt-5">
        {comments.length > 0 ? comments.map((comment, i) => (
          <div key={i} className="flex items-start border-b pb-4">
            <DateCard date={comment.date} />
            <div className="flex-grow min-w-0"><CommentMarkdown content={comment.content} /></div>
          </div>
        )) :
          <ExplainingBanner>
            コメントはまだありません
          </ExplainingBanner>}
      </div>
      <PostingForm slug={slug} />
    </section>
  </GoogleReCaptchaProvider>
}