import Link from 'next/link';
import TagBanner from '../tag/TagBanner';
import DateCard from './DateCard';
import { Post } from '@/static/postType';
import { makeExcerpt } from '@/lib/textFormatter';
import Image from 'next/image';
import React from 'react';

function PostDescription({ post }: { post: Post }) {
  return (
    <div className='flex min-h-28 items-center'>
      <DateCard date={post.data.date} />
      <div className='ml-2 mt-2 flex flex-grow flex-col'>
        <p className='mb-1 mr-4 border-b text-lg leading-6 transition-colors dark:border-slate-700'>
          {post.data.series ? (
            <span className='mr-1.5 inline-block bg-slate-200 px-1 py-0.5 text-sm transition-colors dark:bg-slate-700'>
              シリーズ
            </span>
          ) : (
            <></>
          )}
          <span className='transition-colors dark:text-white'>{post.data.title}</span>
        </p>
        <p className='mb-2 px-4 text-xs leading-3'>{makeExcerpt(post.excerpt, 64)}</p>
      </div>
    </div>
  );
}

function PostLinks({ post }: { post: Post }) {
  return (
    <React.Fragment>
      {post.data.tags || post.data.series ? (
        <div className='mb-3 ml-2 flex flex-wrap gap-1 pb-3'>
          {post.data.series ? (
            <Link href={`/series/${post.data.series}`}>
              <div className='group rounded-md border border-blue-400 px-1 text-sm transition-colors hover:bg-blue-400 dark:border-violet-500 dark:hover:bg-violet-500'>
                <span className='leading-4 text-blue-500 transition-colors group-hover:text-white dark:text-violet-500 dark:group-hover:text-slate-200'>
                  シリーズを表示
                </span>
              </div>
            </Link>
          ) : (
            <></>
          )}
          {post.data.tags?.map((tag, i) => <TagBanner tag={tag} isSmall={true} key={i} />)}
        </div>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <div className='w-full rounded-md border border-transparent bg-white transition-all hover:border-gray-200 hover:shadow-md dark:bg-slate-800'>
      <div>
        <Link href={`/post/${post.slug}`}>
          <PostDescription post={post} />
        </Link>
      </div>
      <PostLinks post={post} />
    </div>
  );
}

export function PostLargeCard({ post }: { post: Post }) {
  return (
    <div className='w-full rounded-md border border-transparent bg-white transition-all hover:border-gray-200 hover:shadow-md dark:bg-slate-800'>
      <div>
        <Link href={`/post/${post.slug}`}>
          <div className='overflow-hidden rounded-md bg-slate-100 dark:bg-slate-700'>
            <Image
              alt={post.data.title}
              width={1200}
              height={630}
              src={
                post.data.thumbnail
                  ? `/api/get-thumbnail?path=${encodeURIComponent(post.data.thumbnail)}`
                  : `/api/ogp-posts/${post.slug}`
              }
            />
          </div>
          <PostDescription post={post} />
        </Link>
      </div>
      <PostLinks post={post} />
    </div>
  );
}
