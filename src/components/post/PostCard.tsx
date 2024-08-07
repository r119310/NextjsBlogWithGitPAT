import Link from 'next/link';
import TagBanner from '../TagBanner';
import DateCard from './DateCard';

export default function PostCard({ post }: {
  post: {
    slug: string;
    data: {
      [key: string]: any;
    };
  }
}) {
  return <div className='hover:shadow-md rounded-md'>
    <div><Link href={`/post/${post.slug}`}>
      <div className="min-h-24 flex items-center">
        <DateCard date={post.data.date} />
        <div className='mt-2 ml-2'>
          <p className='text-lg'>{post.data.title}</p>
        </div>
      </div></Link>
    </div>
    {post.data.tags ?
      <div className='ml-2 mb-3 flex flex-wrap gap-1'>
        {(post.data.tags as string[]).map((tag, i) => <TagBanner tag={tag} isSmall={true} key={i} />)}
      </div> : <></>}
  </div>
}