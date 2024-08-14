import { getSeries } from "@/lib/getPosts";
import Link from "next/link";
import PostCard from "./post/PostCard";
import { ExplainingBanner } from "./UserBanner";

export default async function SeriesCard({ slug, index }: { slug: string, index?: number }) {
  const { meta, posts } = await getSeries(slug);

  return <section className='rounded-lg'>
    <Link href={`/series/${slug}`}><div className='transition-colors py-2 px-4 rounded-t-lg border border-gray-200 bg-gray-200 text-lg hover:border-gray-300 hover:bg-gray-300 dark:bg-slate-700 dark:border-slate-700 dark:hover:bg-slate-600 dark:hover:border-slate-600 dark:text-white'>
      {meta.name} ({posts.length}件)
    </div></Link>
    <div className='transition-colors p-2 rounded-b-lg border border-gray-200 dark:border-slate-700'>
      {posts.length > 0 ? typeof index !== 'undefined' ?
        <div className="flex flex-col gap-3">
          <div>
            <p className='pl-2 mb-2 text-left'>前の投稿</p>
            {index - 1 >= 0 ?
              <PostCard post={posts[index - 1]} /> :
              <ExplainingBanner>
                最初の投稿です
              </ExplainingBanner>}
          </div>
          <div>
            <p className='pr-2 mb-2 text-right'>次の投稿</p>
            {index + 1 < posts.length ?
              <PostCard post={posts[index + 1]} /> :
              <ExplainingBanner>
                最新の投稿です
              </ExplainingBanner>}
          </div>
        </div> :
        <div>
          <p className='pl-2 mb-2'>最初の記事</p>
          <PostCard post={posts[0]} />
        </div> : <></>}
    </div>
  </section>
}