import { author } from "@/static/constant";
import Link from "next/link";

export default function Footer() {

  return <footer className="bg-gray-100">
    <div className="max-w-4xl w-full mx-auto flex items-center flex-col justify-center p-5">
      <div className="p-3">
        <p>ブログを書いている人</p>
        <div className="bg-gray-200 rounded-lg flex gap-5 px-3 py-2 mt-2">
          <div>
            <p className="ml-2">{author.name}</p>
            <p className="ml-2"><Link className="underline hover:no-underline" target="_blank" rel="noopener noreferrer" href={author.url}>
              ホームページ<span className="i-tabler-link" />
            </Link></p>
          </div>
          <div>
            <Link href="/profile">
              <div className="size-12 rounded-lg bg-blue-100 border border-blue-400 flex items-center justify-center group">
                <span className="i-tabler-user-circle size-7 bg-blue-400 group-hover:bg-yellow-500" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <small>&copy; isirmt</small>
    </div>
  </footer>
}