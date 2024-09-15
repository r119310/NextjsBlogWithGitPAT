'use client';
import { Comment } from '@/static/issueType';
import DateCard from './DateCard';
import { CommentMarkdown } from './MarkdownElements';
import PostingForm from './CommentPostingBox';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ExplainingBanner } from '../UserBanner';

function CommentsView({ comments }: { comments: Comment[] }) {
  return (
    <div className='mt-5 flex flex-col gap-4'>
      {comments.length > 0 ? (
        comments.map((comment, i) => (
          <div key={i} className='block items-start border-b pb-4 lg:flex'>
            <DateCard date={comment.date} />
            <div className='mt-5 min-w-0 flex-grow lg:mt-0'>
              <CommentMarkdown content={comment.content} />
            </div>
          </div>
        ))
      ) : (
        <ExplainingBanner>コメントはまだありません</ExplainingBanner>
      )}
    </div>
  );
}

export function CommentForm({ comments, slug }: { comments: Comment[]; slug: string }) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} language='ja'>
      <section className='mt-10 border-t pt-5'>
        <h2
          id='user-comments'
          className='scroll-mt-16 text-[1.5rem] text-blue-900 transition-colors dark:text-blue-500'
        >
          <b>コメント</b>
        </h2>
        <CommentsView comments={comments} />
        <PostingForm slug={slug} />
      </section>
    </GoogleReCaptchaProvider>
  );
}

export function CommentFormNoPosting({ comments }: { comments: Comment[] }) {
  return (
    <section className='mt-10 border-t pt-5'>
      <h2 id='user-comments' className='scroll-mt-16 text-[1.5rem] text-blue-900 transition-colors dark:text-blue-500'>
        <b>コメント</b>
      </h2>
      <CommentsView comments={comments} />
      <ExplainingBanner>コメントできません</ExplainingBanner>
    </section>
  );
}
