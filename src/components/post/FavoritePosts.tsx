'use client';

import { getFavList } from '@/lib/favTagsManager';
import PostCard from './PostCard';
import { useEffect, useState } from 'react';
import { Post } from '@/static/postType';
import TipsCard from '../TipsCard';
import Link from 'next/link';

export default function FavoritePosts({ posts }: { posts: Post[] }) {
  const [favoriteTags, setFavoriteTags] = useState<string[]>([]);
  const filteredPosts = posts.filter((post) =>
    favoriteTags.some((tag) => (post.data.tags ? post.data.tags.some((postTag) => postTag === tag) : false)),
  );

  useEffect(() => {
    setFavoriteTags(getFavList());
  }, []);

  return (
    <div className='my-3 flex flex-col gap-y-3'>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post, i) => <PostCard post={post} key={i} />)
      ) : (
        <TipsCard>
          <p>「お気に入り」のタグを登録すると表示されます</p>
          <p className='mt-2'>
            「
            <Link className='underline' href='/post'>
              投稿
            </Link>
            」からお気に入りのトピックを見つけよう
          </p>
        </TipsCard>
      )}
    </div>
  );
}
