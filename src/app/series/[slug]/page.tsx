import PostCard from '@/components/post/PostCard';
import TipsCard from '@/components/TipsCard';
import { getSeries } from '@/lib/getposts';
import { Main, Section, Side, Title } from '@/components/layout/PageLayout';
import { Metadata } from 'next';
import { generateMetadataTemplate } from '@/lib/SEO';
import { siteName } from '@/static/constant';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug);

  return generateMetadataTemplate({
    title: `タグ「${slug}」の投稿一覧`,
    description: `「${siteName}」内のタグ「${slug}」が付いた投稿一覧`,
    url: `/tags/${params.slug}`
  });
}

export default async function PostListWithTag({ params }: { params: { slug: string } }) {
  const series = await getSeries(params.slug);

  const posts = series.posts;

  return <Main>
    <Side>
      <TipsCard>シリーズはナンバリングされており、後ろに日付順、日付なしで並んでいます。</TipsCard>
      <TipsCard>タグをクリックすると「タグ検索」が可能です。</TipsCard>
    </Side>
    <Section>
      <Title>
        <span className='text-base mr-3 py-1 px-1.5 rounded-md bg-slate-200'>
          シリーズ
        </span>{series.meta.name}
      </Title>
      {series.meta.description ?
        <div className='p-2 text-gray-800 bg-slate-100'>
          {series.meta.description}
        </div> : <></>}
      <div className='flex flex-col gap-y-3'>
        {posts.map((post, i) => <PostCard post={post} key={i} />)}
      </div>
    </Section>
  </Main>
}