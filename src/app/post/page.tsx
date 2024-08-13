import PostCard from '@/components/post/PostCard';
import { Main, Section, Side, Title } from '@/components/layout/PageLayout';
import TipsCard from '@/components/TipsCard';
import { getPostsProps } from '@/lib/getposts';
import { generateMetadataTemplate } from '@/lib/SEO';
import { siteName } from '@/static/constant';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataTemplate({
    title: `投稿一覧`,
    description: `「${siteName}」内で投稿されている記事のタグをリストアップしています`,
    url: `/post`
  });
}

export default async function PostList() {
  const posts = await getPostsProps();

  return <Main>
    <Side>
      <TipsCard>タグをクリックすると「タグ検索」が可能です。</TipsCard>
    </Side>
    <Section>
      <Title>投稿一覧
        <Link className='inline-block ml-3' target="_blank" rel="noopener noreferrer" href="/feed">
          <span className='transition-colors inline-flex p-1 bg-blue-100 rounded-md border border-blue-400 group dark:bg-violet-700 dark:border-violet-400 dark:hover:bg-violet-600'>
            <span className='transition-colors i-tabler-rss size-5 bg-blue-400 group-hover:bg-yellow-500 dark:bg-violet-400 dark:group-hover:bg-violet-400' />
          </span>
        </Link>
      </Title>
      <div className='flex flex-col gap-y-3'>
        {posts.map((post, i) => <PostCard post={post} key={i} />)}
      </div>
    </Section>
  </Main>
}