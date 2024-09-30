'use client';
import { Post } from '@/static/postType';
import { PostCard, PostLargeCard } from './PostCard';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';

interface ShowingOptionState {
  isLarge: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsLarge: (flag: boolean) => void;
}

// ローカルストレージと連携
const useShowingOptionStore = create<ShowingOptionState>()(
  persist(
    (set) => ({
      isLarge: false,
      setIsLarge: (flag: boolean) => set(() => ({ isLarge: flag })),
    }),
    {
      name: 'showing_option',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

const MorePageSign = () => <div className='pointer-events-none block size-4 rounded-full bg-blue-200'></div>;

const PagingButton = ({ icon, title, func }: { icon: string; title?: string; func: () => void }) => (
  <button
    title={title}
    className='group flex size-12 flex-col items-center justify-center rounded-full border border-blue-500 transition-colors hover:bg-blue-500'
    onClick={func}
  >
    <span className={`${icon} size-8 bg-blue-500 transition-colors group-hover:bg-slate-50`} />
  </button>
);

export default function PostPaging({
  posts,
  useIndex,
  useRouting,
  hideOnePagingButton,
  postsPerPage = 10,
  linkingWidth = 2,
}: {
  posts: Post[];
  useIndex?: boolean;
  useRouting?: boolean;
  hideOnePagingButton?: boolean;
  postsPerPage?: number;
  linkingWidth?: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [page, setPage] = useState<number>(() => {
    const p = useRouting ? searchParams.get('p') : null;
    return useRouting ? (p ? Number(p) : 1) : 1;
  });
  const isLargePostCard = useShowingOptionStore((state) => state.isLarge);
  const setIsLargePostCard = useShowingOptionStore((state) => state.setIsLarge);

  const startIndex = postsPerPage * (page - 1);
  const maxPage = Math.ceil(posts.length / postsPerPage);

  const linkingStartPage = Math.max(page - linkingWidth, 1);
  const linkingEndPage = Math.min(page + linkingWidth, maxPage);
  const linkingPages: number[] = [];
  for (let i = linkingStartPage; i <= linkingEndPage; i++) {
    linkingPages.push(i);
  }

  useEffect(() => {
    if (page <= 0 || page > maxPage) {
      if (useRouting) router.push(pathname);
      setPage(1);
    }
  }, [maxPage, page, router, pathname, useRouting]);

  const displayingPosts = posts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div>
      <div className='mb-2 flex items-center justify-between'>
        {/* ナビゲーション */}
        <div>{posts.length}&nbsp;件</div>
        <div className='flex items-center gap-2'>
          <span className='select-none text-sm'>レイアウト</span>
          <div className='rounded-lg border border-slate-200 dark:border-slate-600'>
            <button
              title='大きい表示'
              className={`group inline-flex size-8 items-center justify-center rounded-lg transition-colors ${isLargePostCard ? 'bg-blue-500' : ''} hover:bg-blue-400`}
              onClick={() => setIsLargePostCard(true)}
            >
              <span
                className={`${isLargePostCard ? 'bg-white' : 'bg-gray-700 dark:bg-slate-400'} i-tabler-photo size-5 transition-colors group-hover:bg-white`}
              ></span>
            </button>
            <button
              title='小さい表示'
              className={`group inline-flex size-8 items-center justify-center rounded-lg transition-colors ${!isLargePostCard ? 'bg-blue-500' : ''} hover:bg-blue-400`}
              onClick={() => setIsLargePostCard(false)}
            >
              <span
                className={`${!isLargePostCard ? 'bg-white' : 'bg-gray-700 dark:bg-slate-400'} i-tabler-list size-5 transition-colors group-hover:bg-white`}
              ></span>
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-y-3'>
        {displayingPosts.map((post, i) => (
          <div key={i} className={useIndex ? 'flex items-stretch gap-1' : ''}>
            {useIndex && (
              <div className='hidden w-10 shrink-0 select-none items-center justify-center overflow-hidden break-all rounded-sm bg-gray-100 px-0.5 text-center text-lg font-bold text-gray-700 dark:bg-slate-700 dark:text-slate-400 lg:flex'>
                {startIndex + i + 1}
              </div>
            )}
            <div className={useIndex ? 'flex flex-grow' : ''}>
              {isLargePostCard ? <PostLargeCard post={post} /> : <PostCard post={post} />}
            </div>
          </div>
        ))}
      </div>
      <div
        className={`${maxPage === 1 ? 'pointer-events-none opacity-50' : ''} ${maxPage === 1 && hideOnePagingButton ? 'hidden' : 'flex'} mt-3 items-center justify-center gap-2`}
      >
        <PagingButton
          title='前のページ'
          icon='i-tabler-arrow-badge-left-filled'
          func={() => {
            const nextPage = page - 1 <= 0 ? maxPage : page - 1;
            if (useRouting) router.push(`${pathname}?p=${nextPage}`);
            setPage(nextPage);
          }}
        />
        <div className='flex gap-1'>
          {linkingStartPage !== 1 ? <MorePageSign /> : <></>}
          {linkingPages.map((item, i) => (
            <button
              key={i}
              title={`${item}ページ目へ`}
              className={`block size-4 rounded-full border border-blue-500 ${page === item ? 'pointer-events-none bg-blue-500' : 'bg-transparent'} transition-colors hover:bg-blue-500`}
              onClick={() => {
                const nextPage = item;
                if (useRouting) router.push(`${pathname}?p=${nextPage}`);
                setPage(nextPage);
              }}
            ></button>
          ))}
          {linkingEndPage !== maxPage ? <MorePageSign /> : <></>}
        </div>
        <PagingButton
          title='次のページ'
          icon='i-tabler-arrow-badge-right-filled'
          func={() => {
            const nextPage = page + 1 > maxPage ? 1 : page + 1;
            if (useRouting) router.push(`${pathname}?p=${nextPage}`);
            setPage(nextPage);
          }}
        />
      </div>
      <div
        className={`${maxPage === 1 && hideOnePagingButton ? 'hidden' : 'block'} mt-2 select-none text-center text-gray-700 dark:text-slate-500`}
      >
        {page}ページ目 <span className='text-sm'>(最大&nbsp;{maxPage}ページ)</span>
      </div>
    </div>
  );
}
