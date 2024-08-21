'use client';
import type { Post } from "@/static/postType";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBox({ posts }: { posts: Post[] }) {
  const [searchWord, setSearchWord] = useState<string>("");
  const router = useRouter();

  const triggerSearch = () => {
    if (searchWord.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchWord)}`)
    } else return;
  }

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchWord.trim() === "") return;
      triggerSearch();
    }
  };

  return <div className="flex justify-center">
    <input
      placeholder="検索..."
      value={searchWord}
      onKeyDown={handleEnterKeyPress}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchWord(e.target.value)}
      className="transition-colors w-48 h-8 px-3 border-gray-700 border-y border-l rounded-s-3xl rounded-e-none dark:bg-slate-800"
    />
    <button
      onClick={triggerSearch}
      title="検索する [Enter]"
      className="transition-colors w-10 h-8 px-2 bg-gray-700 rounded-e-3xl border-gray-700 hover:bg-gray-800 hover:border-gray-800 border-y border-r flex justify-center items-center">
      <span className="transition-colors i-tabler-zoom bg-white size-4 dark:bg-slate-200" />
    </button>
  </div>
}