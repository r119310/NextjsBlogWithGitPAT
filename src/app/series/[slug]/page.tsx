import PostCard from '@/components/post/PostCard';
import TipsCard from '@/components/TipsCard';
import { getSeries } from '@/lib/getPosts';
import { Main, Section, Side, Title } from '@/components/layout/PageLayout';
import { Metadata } from 'next';
import { generateMetadataTemplate } from '@/lib/SEO';
import { siteName } from '@/static/constant';
import { cache } from 'react';
import React from 'react';

const getContents = cache(async (slug: string) => {
  return getSeries(slug);
});

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug);
  const series = await getContents(slug);

  return generateMetadataTemplate({
    title: `「${series.meta.name}」シリーズの投稿一覧`,
    description: `${series.meta.description ? series.meta.description : `「${siteName}」内の「${slug}」シリーズの投稿一覧`}`,
    url: `/series/${params.slug}`,
  });
}

export default async function PostListWithTag({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
  const series = await getContents(slug);

  const posts = series.posts;

  return (
    <Main>
      <Side>
        <TipsCard>シリーズはナンバリングされており、後ろに日付順、日付なしで並んでいます。</TipsCard>
        <TipsCard>タグをクリックすると「タグ検索」が可能です。</TipsCard>
      </Side>
      <Section>
        <Title>
          <span className='mr-3 rounded-md bg-slate-200 px-1.5 py-1 text-base transition-colors dark:bg-slate-700'>
            シリーズ
          </span>
          {series.meta.name}
        </Title>
        {series.meta.description ? (
          <div className='my-3 bg-slate-100 p-2 text-gray-800 transition-colors dark:bg-slate-700 dark:text-slate-400'>
            {series.meta.description}
          </div>
        ) : (
          <></>
        )}
        <div className='flex flex-col gap-y-3'>
          {posts.map((post, i) => (
            <div className='flex items-stretch gap-1' key={i + 1}>
              <div className='hidden w-10 items-center justify-center overflow-hidden break-all rounded-sm bg-gray-100 px-0.5 text-center text-lg font-bold text-gray-700 dark:bg-slate-700 dark:text-slate-400 lg:flex'>
                {i + 1}
              </div>
              <div className='flex flex-grow'>
                <PostCard post={post} />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </Main>
  );
}
