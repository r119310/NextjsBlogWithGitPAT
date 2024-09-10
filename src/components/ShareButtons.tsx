import Link from 'next/link';

function replaceToFullWidth(str: string) {
  return str.replace(/[#$]/g, (match) => {
    switch (match) {
      case '#':
        return '＃ ';
      case '$':
        return '＄ ';
      default:
        return match;
    }
  });
}

function SNSButton({
  url,
  hoverColor,
  icon,
  title,
}: {
  url: string;
  hoverColor: string;
  icon: string;
  title?: string;
}) {
  return (
    <div>
      <Link target='_blank' rel='noopener noreferrer' title={title ?? 'シェア'} href={url}>
        <div className={`${icon} size-8 bg-gray-500 hover:bg-[${hoverColor}]`} />
      </Link>
    </div>
  );
}

export default function ShareButtons({ path, text }: { path: string; text: string }) {
  const sharingURL = `${process.env.NEXT_PUBLIC_URL!}${path}`;
  const sharingText = replaceToFullWidth(text);

  return (
    <div className='flex flex-row justify-center gap-3'>
      <SNSButton
        url={`http://twitter.com/intent/tweet?url=${sharingURL}&text=${encodeURIComponent(sharingText)}`}
        hoverColor='black'
        icon='i-tabler-brand-x'
        title='Xへシェアする'
      />
      <SNSButton
        url={`https://www.facebook.com/sharer.php?u=${sharingURL}`}
        hoverColor='#1877f2'
        icon='i-tabler-brand-facebook'
        title='Facebookへシェアする'
      />
    </div>
  );
}
