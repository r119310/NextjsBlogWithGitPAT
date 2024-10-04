/* eslint-disable @next/next/no-img-element */
import { getHeaders, getNext } from '@/lib/fetchingFunc';
import { author, enableShowGitHubProfile, enableShowXProfile } from '@/static/constant';
import Link from 'next/link';

export default async function Footer() {
  const githubProfile = await fetch(`https://api.github.com/user`, {
    ...getHeaders(),
    ...getNext(3600 * 24),
  }).then((res) => {
    if (res.status === 200) return res.json();
    else
      return {
        private_content: true,
      };
  });

  return (
    <footer>
      <div className='mx-auto flex w-full flex-col items-center justify-center p-5'>
        <div className='p-3'>
          <p>ブログを書いている人</p>
          <div className='mt-2 gap-5 rounded-lg bg-gray-200 px-3 py-2 transition-colors dark:bg-slate-800 lg:flex lg:items-center'>
            <div className='flex min-w-36 max-w-64 gap-5'>
              <div>
                <p className='ml-2'>{author.name}</p>
                <p className='ml-2 select-none'>
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
                <Link href='/profile' title='プロフィールを表示'>
                  <div className='group flex size-12 items-center justify-center rounded-lg border border-blue-400 bg-blue-100 transition-colors hover:bg-blue-200 dark:border-violet-400 dark:bg-violet-700 dark:hover:bg-violet-600'>
                    <span className='i-tabler-user-circle size-7 bg-blue-400 transition-colors dark:bg-violet-400' />
                  </div>
                </Link>
              </div>
            </div>
            {enableShowGitHubProfile && !githubProfile.private_content ? (
              <div className='mt-3 min-w-36 max-w-64 select-none border-t border-gray-300 pt-3 dark:border-slate-600 lg:mt-0 lg:border-none lg:pt-0'>
                <div className='mb-2'>
                  <span className='i-tabler-brand-github mr-1 size-5 translate-y-1' />
                  <span>GitHub</span>
                </div>
                <div className='flex items-center justify-start gap-2'>
                  <img
                    alt='github_user_icon'
                    className='pointer-events-none size-10 overflow-hidden rounded-full'
                    src={githubProfile.avatar_url}
                  />
                  <div className='flex items-center'>
                    <Link
                      target='_blank'
                      className='underline transition-colors hover:no-underline'
                      rel='noopener noreferrer'
                      href={githubProfile.html_url}
                    >
                      {githubProfile.login}
                    </Link>
                  </div>
                </div>
                {githubProfile.bio ? <div className='mt-2 text-sm'>{githubProfile.bio}</div> : <></>}
              </div>
            ) : (
              <></>
            )}
            {enableShowXProfile && !githubProfile.private_content && githubProfile.twitter_username ? (
              <div className='mt-3 min-w-36 max-w-64 select-none border-t border-gray-300 pt-3 dark:border-slate-600 lg:mt-0 lg:border-none lg:pt-0'>
                <div className='flex items-center justify-start gap-2'>
                  <div className='i-tabler-brand-x size-8 bg-gray-700 transition-colors dark:bg-slate-400' />
                  <div className='flex items-center'>
                    <Link
                      target='_blank'
                      className='underline transition-colors hover:no-underline'
                      rel='noopener noreferrer'
                      href={`https://x.com/${githubProfile.twitter_username}`}
                    >
                      @{githubProfile.twitter_username}
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <small>&copy; {author.name}</small>
      </div>
    </footer>
  );
}
