import { author } from '@/static/constant';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className='mx-auto flex w-full max-w-4xl flex-col items-center justify-center p-5'>
        <div className='p-3'>
          <p>ブログを書いている人</p>
          <div className='mt-2 flex gap-5 rounded-lg bg-gray-200 px-3 py-2 transition-colors dark:bg-slate-800'>
            <div>
              <p className='ml-2'>{author.name}</p>
              <p className='ml-2'>
                <Link
                  className='underline transition-colors hover:no-underline'
                  target='_blank'
                  rel='noopener noreferrer'
                  href={author.url}
                >
                  ホームページ
                  <span className='i-tabler-link' />
                </Link>
              </p>
            </div>
            <div>
              <Link href='/profile'>
                <div className='group flex size-12 items-center justify-center rounded-lg border border-blue-400 bg-blue-100 transition-colors dark:border-violet-400 dark:bg-violet-700 dark:hover:bg-violet-600'>
                  <span className='i-tabler-user-circle size-7 bg-blue-400 transition-colors group-hover:bg-yellow-500 dark:bg-violet-400 dark:group-hover:bg-violet-400' />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <small>&copy; {author.name}</small>
      </div>
    </footer>
  );
}
