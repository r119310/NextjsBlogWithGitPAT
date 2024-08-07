'use client';

import { getFavList } from "@/lib/favTagsManager";
import { useEffect, useState } from "react";
import TagBanner from "./TagBanner";

export default function Menu() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavList());
  }, [])

  return <div className="relative bg-gray-100 flex-grow-0 min-w-72 px-4 hidden xl:block">
    <div className="w-full sticky top-14">
      <div className="p-3">
        お気に入りのタグ
        <div className="mt-2 flex flex-col gap-y-2">
          {favorites.map((tag, i) => <TagBanner isSmall tag={tag} key={i} />)}
        </div>
      </div>
    </div>
  </div>
}