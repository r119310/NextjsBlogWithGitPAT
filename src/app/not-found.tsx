import { InnerLinkBlueButton } from '@/components/InnerLinkButton';
import { Main, Section, Side, Title } from '@/components/layout/PageLayout';
import TipsCard from '@/components/TipsCard';
import { generateMetadataTemplate } from '@/lib/SEO';
import { Metadata } from 'next';

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
      <Section>
        <Title>404 Not Found</Title>
        <TipsCard>お探しのページは名前が変更されたか、移動・削除された可能性があります。</TipsCard>
        <div className='flex flex-col items-center justify-center'>
          <InnerLinkBlueButton path='/post' text='投稿一覧へ' />
        </div>
      </Section>
    </Main>
  );
}
