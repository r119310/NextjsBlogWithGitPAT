import Link from 'next/link';
import TagBanner from '../tag/TagBanner';
import DateCard from './DateCard';
import { Post } from '@/static/postType';
import { makeExcerpt } from '@/lib/textFormatter';

export default function PostCard({ post }: { post: Post }) {
  return <div className='transition-all hover:shadow-md rounded-md bg-white dark:bg-slate-800'>
    <div><Link href={`/post/${post.slug}`}>
      <div className="min-h-28 flex items-center">
        <DateCard date={post.data.date} />
        <div className='mt-2 ml-2'>
          <p className='transition-colors text-lg leading-6 border-b mb-1 mr-4 dark:border-slate-700'>
            {post.data.series ? <span className='transition-colors text-sm mr-1.5 py-0.5 px-1 bg-slate-200 dark:bg-slate-700 inline-block'>シリーズ</span> : <></>}
            {post.data.title}
          </p>
          <p className='text-xs leading-3 px-4 mb-2'>{makeExcerpt(post.excerpt, 64)}</p>
        </div>
      </div></Link>
    </div>
    {post.data.tags || post.data.series ?
      <div className='ml-2 mb-3 flex flex-wrap gap-1 pb-3'>
        {post.data.series ? <Link href={`/series/${post.data.series}`}>
          <div className='transition-colors text-sm px-1 rounded-md border border-blue-400 hover:bg-blue-400 group dark:border-violet-500 dark:hover:bg-violet-500'>
            <span className='transition-colors text-blue-500 group-hover:text-white leading-4 dark:text-violet-500 dark:group-hover:text-slate-200'>シリーズを表示</span>
          </div>
        </Link> : <></>}
        {post.data.tags?.map((tag, i) => <TagBanner tag={tag} isSmall={true} key={i} />)}
      </div> : <></>}
  </div>
}