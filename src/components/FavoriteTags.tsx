'use client';
import { getFavList } from "@/lib/favTagsManager";
import TagBanner from "./TagBanner";
import { useEffect, useState } from "react";

export default function FavoriteTags() {
  const [favoriteTags, setFavoriteTags] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteTags(getFavList());
  }, [])

  return <div className='flex flex-wrap gap-3 my-3'>
    {favoriteTags.map((tag, i) => <TagBanner tag={tag} key={i} />)}
  </div>
}