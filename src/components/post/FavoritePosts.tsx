'use client';

import { getFavList } from "@/lib/favTagsManager";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";

export default function FavoritePosts({ posts }: {
  posts: {
    slug: any;
    data: {
      [key: string]: any;
    };
  }[]
}) {
  const [favoriteTags, setFavoriteTags] = useState<string[]>([]);
  const filteredPosts = favoriteTags.length > 0 ?
    posts.filter((post) => favoriteTags.some((tag) => post.data.tags ? (post.data.tags as string[]).some((postTag) => postTag === tag) : false)) :
    posts;

  useEffect(() => {
    setFavoriteTags(getFavList());
  }, [])

  return <div className='flex flex-col gap-y-3 my-3'>
    {filteredPosts.map((post, i) => <PostCard post={post} key={i} />)}
  </div>
}