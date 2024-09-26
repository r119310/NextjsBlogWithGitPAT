import { InnerLinkBlueButton } from '@/components/InnerLinkButton';
import { Main, SectionNoP, Side, Title } from '@/components/layout/PageLayout';
import TipsCard from '@/components/TipsCard';
import { generateMetadataTemplate } from '@/lib/SEO';
import { Metadata } from 'next';
import headerVideo from '/videos/header_mov.mp4';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataTemplate({
    title: `404 Not Found`,
    url: `/`,
  });
}

export default async function PostList() {
  return (
    <Main>
      <Side>
        <TipsCard>ヘッダーより他のページへジャンプ可能です。</TipsCard>
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
          <Title>404 Not Found</Title>
          <TipsCard>お探しのページは名前が変更されたか、移動・削除された可能性があります。</TipsCard>
          <div className='flex flex-col items-center justify-center'>
            <InnerLinkBlueButton path='/post' text='投稿一覧へ' />
          </div>
        </div>
      </SectionNoP>
    </Main>
  );
}
