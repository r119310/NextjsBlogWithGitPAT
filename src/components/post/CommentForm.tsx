import { Comment } from "@/static/issueType";
import DateCard from "./DateCard";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import { components } from "./MarkdownElements";
import PostingForm from "./CommentPostingBox";

export default function CommentForm({ comments, slug }: { comments: Comment[], slug: string }) {
  return <section className="border-t pt-5 mt-10">
    <h2 className="text-[1.5rem] text-blue-900"><b>コメント</b></h2>
    <div className="flex flex-col gap-4 mt-5">
      {comments.map((comment, i) => (
        <div key={i} className="flex items-start border-b pb-4">
          <DateCard date={comment.date} />
          <div className="markdown">
            <ReactMarkdown components={components} remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {comment.content}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
    <PostingForm slug={slug} />
  </section>
}