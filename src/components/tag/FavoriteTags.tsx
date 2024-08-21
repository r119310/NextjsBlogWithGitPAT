'use client';
import { getFavList } from "@/lib/favTagsManager";
import TagBanner from "./TagBanner";
import { useEffect, useState } from "react";
import { ExplainingBanner } from "../UserBanner";

export default function FavoriteTags() {
  const [favoriteTags, setFavoriteTags] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteTags(getFavList());
  }, [])

  return <div
    title={`${favoriteTags.length} 件のお気に入り`}
    className='flex flex-wrap gap-3 my-3'>
    {favoriteTags.length > 0 ?
      favoriteTags.map((tag, i) => <TagBanner tag={tag} key={i} />) :
      <ExplainingBanner>
        「お気に入り」のタグはありません
      </ExplainingBanner>}
  </div>
}