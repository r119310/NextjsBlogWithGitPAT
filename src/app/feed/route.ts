import { getPostsProps } from '@/lib/getposts';
import { siteName } from '@/static/constant';
import Rss from 'rss';

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const baseURL = process.env.NEXT_PUBLIC_URL!;

export async function GET() {
  const feed = new Rss({
    title: `${siteName}の新着投稿`,
    description: `「${siteName}」の投稿フィード`,
    feed_url: `${baseURL}/feed`,
    site_url: baseURL,
    language: 'ja'
  });

  const posts = await getPostsProps();

  posts.forEach((post) => feed.item({
    title: post.data.title,
    description: post.excerpt,
    url: `${baseURL}/post/${post.slug}`,
    date: new Date((post.data.date as string).replace(/-/g, "/")).toISOString()
  }))

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': `s-maxage=${revalidate}, stale-while-revalidate`
    }
  });
}