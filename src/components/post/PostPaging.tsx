'use client';
import { Post } from '@/static/postType';
import PostCard from './PostCard';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import Link from 'next/link';

const MorePageSign = () => <div className='pointer-events-none block size-4 rounded-full bg-blue-200'></div>;

export default function PostPaging({ posts, useIndex }: { posts: Post[]; useIndex?: boolean }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const p = searchParams.get('p');
  const page = p ? Number(p) : 1;
  const postsPerPage = 10;
  const startIndex = postsPerPage * (page - 1);
  const maxPage = Math.trunc(posts.length / postsPerPage);

  const linkingWidth = 2;
  const linkingStartPage = Math.max(page - linkingWidth, 1);
  const linkingEndPage = Math.min(page + linkingWidth, maxPage);
  const linkingPages: number[] = [];
  for (let i = linkingStartPage; i <= linkingEndPage; i++) {
    linkingPages.push(i);
  }

  useEffect(() => {
    if (page <= 0 || page > maxPage) {
      router.push('${pathname}');
    }
  }, [maxPage, page, router]);

  const displayingPosts = posts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div>
      <div className='flex flex-col gap-y-3'>
        {displayingPosts.map((post, i) => (
          <React.Fragment key={i}>
            {useIndex ? (
              <div className='flex items-stretch gap-1'>
                <div className='hidden w-10 shrink-0 select-none items-center justify-center overflow-hidden break-all rounded-sm bg-gray-100 px-0.5 text-center text-lg font-bold text-gray-700 dark:bg-slate-700 dark:text-slate-400 lg:flex'>
                  {startIndex + i + 1}
                </div>
                <div className='flex flex-grow'>
                  <PostCard post={post} />
                </div>
              </div>
            ) : (
              <PostCard post={post} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className='mt-3 flex items-center justify-center gap-2'>
        <button
          title='前のページ'
          className='group flex size-12 flex-col items-center justify-center rounded-full border border-blue-500 transition-colors hover:bg-blue-500'
          onClick={() => router.push(`${pathname}?p=${page - 1 <= 0 ? maxPage : page - 1}`)}
        >
          <span className='i-tabler-arrow-badge-left-filled size-8 bg-blue-500 transition-colors group-hover:bg-slate-50' />
        </button>
        <div className='flex gap-1'>
          {linkingStartPage !== 1 ? <MorePageSign /> : <></>}
          {linkingPages.map((item, i) => (
            <Link
              key={i}
              className={`block size-4 rounded-full border border-blue-500 ${page === item ? 'pointer-events-none bg-blue-500' : 'bg-transparent'} transition-colors hover:bg-blue-500`}
              href={`${pathname}?p=${item}`}
            ></Link>
          ))}
          {linkingEndPage !== maxPage ? <MorePageSign /> : <></>}
        </div>
        <button
          title='次のページ'
          className='group flex size-12 flex-col items-center justify-center rounded-full border border-blue-500 transition-colors hover:bg-blue-500'
          onClick={() => router.push(`${pathname}?p=${page + 1 > maxPage ? 1 : page + 1}`)}
        >
          <span className='i-tabler-arrow-badge-right-filled size-8 bg-blue-500 transition-colors group-hover:bg-slate-50' />
        </button>
      </div>
      <div className='mt-2 text-center text-gray-700'>
        {page}ページ目 <span className='text-sm'>(最大&nbsp;{maxPage}ページ)</span>
      </div>
    </div>
  );
}
