import Link from "next/link";
import SearchBoxWrapper from "../SearchBoxWrapper";
import { siteName } from "@/static/constant";
import Image from "next/image";

export default function Header() {
  return <header className="sticky top-0 z-10 bg-gray-100 px-4">
    <nav className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 items-center h-14">
      <div className="flex flex-row">
        <div>
          <Link className="hover:underline" href="/">
            <div className="flex gap-1.5">
              <Image width={30} height={30} src="/icon_vec.svg" alt="icon" />
              <span className="text-lg">{siteName}</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="hidden md:block"><SearchBoxWrapper /></div>
      <div className="flex flex-row-reverse gap-3">
        <span><Link className="hover:underline" href="/tags">タグ</Link></span>
        <span><Link className="hover:underline" href="/series">シリーズ</Link></span>
        <span><Link className="hover:underline" href="/post">投稿</Link></span>
      </div>
    </nav>
  </header>
}