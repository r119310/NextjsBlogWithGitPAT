import { Post } from "@/static/postType";
import PostCard from "./post/PostCard";
import TagBanner from "./tag/TagBanner";

export default function SearchResult({ posts, keywords }: { posts: Post[], keywords: string[] }) {
  const tags: string[] = Array.from(new Set(posts
    .filter((post) => post.data.tags)
    .flatMap((post) => post.data.tags as string[])
  ));
  const filteredPosts = posts.filter(post =>
    keywords.every(keyword => (post.data.title as string).toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
  );

  const filteredTags = tags.filter(tag =>
    keywords.every(keyword => tag.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
  );

  return <section>
    <div>
      <h2>検索キーワード</h2>
      <div className="mt-2 flex flex-wrap gap-3">
        {keywords.map((keyword, i) => <span key={i} className="transition-colors py-0.5 px-2 bg-gray-100 rounded-md dark:bg-slate-700">
          {keyword}
        </span>)}
      </div>
    </div>
    <div className="mt-2">
      <h2>タグ({filteredTags.length}件)</h2>
      <div className="mt-2 flex flex-wrap gap-3">
        {filteredTags.map((tag, i) => <TagBanner tag={tag} key={i} />)}
      </div>
    </div>
    <div className="mt-2">
      <h2>投稿({filteredPosts.length}件)</h2>
      <div className="mt-2 flex flex-col gap-y-3">
        {filteredPosts.map((post, i) => <PostCard post={post} key={i} />)}
      </div>
    </div>
  </section>
}