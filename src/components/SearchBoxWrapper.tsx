import { getPostsProps } from "@/lib/getposts"
import SearchBox from "./SearchBox";

export default async function SearchBoxWrapper() {
  const posts = await getPostsProps();
  return <SearchBox posts={posts} />;
}