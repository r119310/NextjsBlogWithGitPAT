'use client';
import { addFavorite, hasFavorite, removeFavorite } from '@/lib/favTagsManager';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TagBanner({ tag, isSmall = false }: { tag: string, isSmall?: boolean }) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    setIsFavorite(hasFavorite(tag));
  }, [tag])

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(tag);
    } else {
      addFavorite(tag);
    }
    setIsFavorite(!isFavorite);
  }

  return <div className='flex'>
    <Link href={`/tags/${tag}`}>
      <div
        title={`「#${tag}」で検索する`}
        className={`transition-colors ${isSmall ? "text-sm px-1 rounded-md border" : "py-1.5 pl-4 pr-3 rounded-s-3xl border-y border-l"} border-blue-400 hover:bg-blue-400 group dark:border-violet-500 dark:hover:bg-violet-500`}>
        <span className='transition-colors before:content-["#"] before:mr-1 text-blue-500 group-hover:text-white dark:text-violet-500 dark:group-hover:text-slate-200'>
          {tag}
        </span>
      </div>
    </Link>
    {!isSmall ? <button
      title={isFavorite ? "お気に入りを解除する" : "お気に入りに登録する"}
      onClick={toggleFavorite}
      className={`transition-colors bg-blue-50 w-12 rounded-e-3xl border-e border-y border-blue-400 items-center justify-center flex group dark:bg-slate-700 dark:border-violet-500`}>
      <div className={`transition-colors ${isFavorite ? "i-tabler-tag-filled bg-yellow-500 dark:bg-amber-400" : "i-tabler-tag bg-blue-400 group-hover:bg-yellow-500 dark:bg-amber-500 dark:group-hover:bg-amber-400"} size-6`} />
    </button> : <></>}
  </div>
}