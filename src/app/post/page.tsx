import { Main, Section, Side, Title } from '@/components/layout/PageLayout';
import TipsCard from '@/components/TipsCard';
import { getPostsProps } from '@/lib/getPosts';
import { generateMetadataTemplate } from '@/lib/SEO';
import { siteName } from '@/static/constant';
import { Metadata } from 'next';
import FeedButton from '@/components/post/FeedButton';
import PostPaging from '@/components/post/PostPaging';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataTemplate({
    title: `投稿一覧`,
    description: `「${siteName}」内で投稿されている記事のタグをリストアップしています`,
    url: `/post`,
  });
}

export default async function PostList() {
  const posts = await getPostsProps();

  return (
    <Main>
      <Side>
        <TipsCard>タグをクリックすると「タグ検索」が可能です。</TipsCard>
      </Side>
      <Section>
        <Title>
          投稿一覧
          <FeedButton url='/feed' />
        </Title>
        <PostPaging posts={posts} />
      </Section>
    </Main>
  );
}
