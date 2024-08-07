'use client'
import { useEffect, useState } from 'react';
import { addFavorite, hasFavorite, removeFavorite } from '@/lib/favTagsManager';

export default function SubscribeTagButton({ tag }: { tag: string }) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    setIsFavorite(hasFavorite(tag));
  }, [tag]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(tag);
    } else {
      addFavorite(tag);
    }
    setIsFavorite(!isFavorite);
  }

  return <button onClick={toggleFavorite}
    className={`${isFavorite ? "bg-white text-blue-500" : "bg-blue-500 text-white"} drop-shadow-md my-1 px-4 py-1.5 rounded-3xl border border-blue-500`}>
    {isFavorite ? "登録済み" : "お気に入り登録"}
  </button>
}