import Link from 'next/link';

export default function FeedButton({ url }: { url: string }) {
  return (
    <Link className='ml-3 inline-block' target='_blank' rel='noopener noreferrer' href={url}>
      <span
        title='購読する'
        className='group inline-flex rounded-md border border-blue-400 bg-blue-100 p-1 transition-colors dark:border-violet-400 dark:bg-violet-700 dark:hover:bg-violet-600'
      >
        <span className='i-tabler-rss size-5 bg-blue-400 transition-colors group-hover:bg-yellow-500 dark:bg-violet-400 dark:group-hover:bg-violet-400' />
      </span>
    </Link>
  );
}
