import PostCard from '@/components/post/PostCard';
import SubscribeTagButton from '@/components/tag/SubscribeTagButton';
import TipsCard from '@/components/TipsCard';
import { getPostsProps } from '@/lib/getPosts';
import { Main, Section, Side, Title } from '@/components/layout/PageLayout';
import { Metadata } from 'next';
import { generateMetadataTemplate } from '@/lib/SEO';
import { siteName } from '@/static/constant';
import FeedButton from '@/components/post/FeedButton';
import { IconDescriptor, Icons } from 'next/dist/lib/metadata/types/metadata-types';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug);

  const baseMetadata = generateMetadataTemplate({
    title: `タグ「${slug}」の投稿一覧`,
    description: `「${siteName}」内のタグ「${slug}」が付いた投稿一覧`,
    url: `/tags/${params.slug}`
  });

  const icons = baseMetadata.icons as Icons;

  return {
    ...baseMetadata,
    icons: {
      ...icons,
      other: [
        ...(icons.other as IconDescriptor[]),
        {
          url: `/tags/${params.slug}/feed`,
          rel: "alternate",
          type: "application/atom+xml"
        }
      ]
    }
  };
}

export default async function PostListWithTag({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
  const posts = await getPostsProps();
  const filteredPosts = posts.filter((post) => post.data.tags ? post.data.tags.some((tag) => tag === slug) : false);

  return <Main>
    <Side>
      <TipsCard>メニューバーに登録する場合は「お気に入り登録」を押します。</TipsCard>
    </Side>
    <Section>
      <Title>タグ「#{slug}」の投稿一覧
        <FeedButton url={`/tags/${params.slug}/feed`} />
      </Title>
      <SubscribeTagButton tag={slug} />
      <div className='flex flex-col gap-y-3'>
        {filteredPosts.map((post, i) => <PostCard post={post} key={i} />)}
      </div>
    </Section>
  </Main>
}