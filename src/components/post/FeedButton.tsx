import Link from "next/link";

export default function FeedButton({ url }: { url: string }) {
  return <Link className='inline-block ml-3' target="_blank" rel="noopener noreferrer" href={url}>
    <span
      title="購読する"
      className='transition-colors inline-flex p-1 bg-blue-100 rounded-md border border-blue-400 group dark:bg-violet-700 dark:border-violet-400 dark:hover:bg-violet-600'>
      <span className='transition-colors i-tabler-rss size-5 bg-blue-400 group-hover:bg-yellow-500 dark:bg-violet-400 dark:group-hover:bg-violet-400' />
    </span>
  </Link>
}