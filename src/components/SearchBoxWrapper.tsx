import { getPostsProps } from '@/lib/getPosts';
import SearchBox from './SearchBox';

export default async function SearchBoxWrapper() {
  const posts = await getPostsProps();
  return <SearchBox posts={posts} />;
}
