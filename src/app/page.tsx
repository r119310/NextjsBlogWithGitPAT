import { getPostsProps } from '@/lib/getPosts';
import { Main, SectionNoP, Side, Title } from '@/components/layout/PageLayout';
import TipsCard from '@/components/TipsCard';
import FavoritePosts from '@/components/post/FavoritePosts';
import FavoriteTags from '@/components/tag/FavoriteTags';
import { siteName } from '@/static/constant';
import SearchBoxWrapper from '@/components/SearchBoxWrapper';
import { generateMetadataTemplate } from '@/lib/SEO';
import { Metadata } from 'next';
import { InnerLinkBlueButton } from '@/components/InnerLinkButton';
import PostCard from '@/components/post/PostCard';
import { WebSite, WithContext } from 'schema-dts';
import JsonLd from '@/components/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataTemplate({
    url: `/`
  });
}

export default async function Blogs() {
  const posts = await getPostsProps();

  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: process.env.NEXT_PUBLIC_URL!,
  }

  return <Main>
    <JsonLd jsonLd={jsonLd} />
    <Side>
      <TipsCard>
        ブログへようこそ！<br />
        まだ製作途中ですがよろしくお願いします...!
      </TipsCard>
    </Side>
    <SectionNoP>
      <div className='transition-colors bg-blue-300 w-full h-36 items-center flex flex-col justify-center dark:bg-violet-600'>
        準備中...
      </div>
      <div className='px-8 pb-8 pt-3'>
        <Title>{siteName}</Title>
        <div className='my-3 md:hidden'><SearchBoxWrapper /></div>
        <h2>「お気に入り」のタグ一覧</h2>
        <FavoriteTags />
        <h2>「お気に入り」登録タグの投稿一覧</h2>
        <FavoritePosts posts={posts} />
        <h2>最新の記事</h2>
        <div className='flex flex-col gap-y-3 my-3'>
          {posts.slice(0, 5).map((post, i) => <PostCard post={post} key={i} />)}
        </div>
        <div className='items-center justify-center flex flex-col'>
          <InnerLinkBlueButton path='/post' text='投稿一覧へ' />
        </div>
      </div>
    </SectionNoP>
  </Main>
}