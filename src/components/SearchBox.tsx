'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

const regex = /[^\u0020\u3000]/;

export default function SearchBox({ posts }: {
  posts: {
    slug: any;
    data: {
      [key: string]: any;
    };
  }[]
}) {
  const [searchWord, setSearchWord] = useState<string>("");
  const router = useRouter();

  const triggerSearch = () => {
    if (regex.test(searchWord)) {
      router.push(`/search?q=${encodeURIComponent(searchWord)}`)
    } else return;
  }

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!regex.test(searchWord)) return;
      triggerSearch();
    }
  };

  return <div className="flex justify-center">
    <input
      placeholder="検索..."
      value={searchWord}
      onKeyDown={handleEnterKeyPress}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchWord(e.target.value)}
      className="w-48 h-8 px-3 border-gray-700 border-y border-l rounded-s-3xl rounded-e-none"
    />
    <button
      onClick={triggerSearch}
      className="w-10 h-8 px-2 bg-gray-700 rounded-e-3xl border-gray-700 border-y border-r flex justify-center items-center">
      <span className="i-tabler-zoom bg-white size-4" />
    </button>
  </div>
}