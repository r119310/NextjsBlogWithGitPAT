import TagBanner from '@/components/TagBanner';
import TipsCard from '@/components/TipsCard';
import { getPostsProps } from '@/lib/getposts';
import { Main, Section, Side, Title } from '@/components/SideHiddenPage';
import { Metadata } from 'next';
import { generateMetadataTemplate } from '@/lib/SEO';
import { siteName } from '@/static/constant';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataTemplate({
    title: `タグ一覧`,
    description: `「${siteName}」内で投稿されている記事のタグをリストアップしています`,
    url: `/tags`
  });
}

export default async function TagList() {
  const posts = await getPostsProps();
  const tags: string[] = Array.from(new Set(posts
    .filter((post) => post.data.tags)
    .flatMap((post) => post.data.tags)
  ));

  return <Main>
    <Side>
      <TipsCard>アイコンを押すとお気に入りの登録・解除が可能です。</TipsCard>
    </Side>
    <Section>
      <Title>タグ一覧</Title>
      <div className='flex flex-wrap gap-3'>
        {tags.map((tag, i) => <TagBanner tag={tag} key={i} />)}
      </div>
    </Section>
  </Main>
}