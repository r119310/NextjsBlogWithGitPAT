import { getPostsProps } from '@/lib/getposts';
import { Main, SectionNoP, Side, Title } from '@/components/post/PageLayout';
import TipsCard from '@/components/TipsCard';
import FavoritePosts from '@/components/post/FavoritePosts';
import FavoriteTags from '@/components/tag/FavoriteTags';
import { siteName } from '@/static/constant';
import SearchBoxWrapper from '@/components/SearchBoxWrapper';
import { generateMetadataTemplate } from '@/lib/SEO';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataTemplate({
    url: `/`
  });
}

export default async function Blogs() {
  const posts = await getPostsProps();

  return <Main>
    <Side>
      <TipsCard>
        ブログへようこそ！<br />
        まだ製作途中ですがよろしくお願いします...!
      </TipsCard>
    </Side>
    <SectionNoP>
      <div className='bg-blue-300 w-full h-36 items-center flex flex-col justify-center'>
        準備中...
      </div>
      <div className='px-8 pb-8 pt-3'>
        <Title>{siteName}</Title>
        <div className='my-3 md:hidden'><SearchBoxWrapper /></div>
        <h2>「お気に入り」のタグ一覧</h2>
        <FavoriteTags />
        <h2>「お気に入り」登録タグの投稿一覧</h2>
        <FavoritePosts posts={posts} />
        <div className='items-center justify-center flex flex-col'>
          <Link href="/post">
            <div className='border-blue-600 border-2 bg-blue-500 hover:bg-blue-600 py-2 px-4 text-lg text-white drop-shadow-xl rounded-3xl'>投稿一覧へ</div>
          </Link>
        </div>
      </div>
    </SectionNoP>
  </Main>
}