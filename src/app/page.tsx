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
import Link from 'next/link';
import headerVideo from '/videos/header_mov.mp4';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataTemplate({
    url: `/`,
  });
}

export default async function Blogs() {
  const posts = await getPostsProps();

  const jsonLd: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: process.env.NEXT_PUBLIC_URL!,
  };

  return (
    <Main>
      <JsonLd jsonLd={jsonLd} />
      <Side>
        <TipsCard>
          ブログへようこそ！
          <br />
          <Link target='_blank' rel='noopener noreferrer' href='https://github.com/isirmt/NextjsBlogWithGitPAT/issues'>
            <u>バグ・問題等の報告はこちらへ</u>
          </Link>
        </TipsCard>
      </Side>
      <SectionNoP>
        <div className='pointer-events-none m-0 aspect-[10_/_3] w-full overflow-hidden bg-[#0e4589] p-0'>
          <video
            src={headerVideo}
            autoPlay
            muted
            loop
            disableRemotePlayback
            disablePictureInPicture
            preload='auto'
            playsInline
          />
        </div>
        <div className='px-8 pb-8 pt-3'>
          <Title>{siteName}</Title>
          <div className='my-3 md:hidden'>
            <SearchBoxWrapper />
          </div>
          <h2>「お気に入り」のタグ一覧</h2>
          <FavoriteTags />
          <h2>「お気に入り」登録タグの投稿一覧</h2>
          <FavoritePosts posts={posts} />
          <h2>最新の記事</h2>
          <div className='my-3 flex flex-col gap-y-3'>
            {posts.slice(0, 5).map((post, i) => (
              <PostCard post={post} key={i} />
            ))}
          </div>
          <div className='flex flex-col items-center justify-center'>
            <InnerLinkBlueButton path='/post' text='投稿一覧へ' />
          </div>
        </div>
      </SectionNoP>
    </Main>
  );
}
