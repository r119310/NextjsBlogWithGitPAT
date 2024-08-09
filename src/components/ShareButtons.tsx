import Link from "next/link";

function SNSButton({ url, hoverColor, icon }: { url: string, hoverColor: string, icon: string }) {
  return <div>
    <Link target="_blank" rel="noopener noreferrer"
      href={url}>
      <div className={`${icon} bg-gray-500 size-8 hover:bg-[${hoverColor}]`} />
    </Link>
  </div>
}

export default function ShareButtons({ path, text }: { path: string, text: string }) {
  const sharingURL = `${process.env.NEXT_PUBLIC_URL}${path}`;

  return <div className="flex flex-row gap-3 justify-center">
    <SNSButton
      url={`http://twitter.com/intent/tweet?url=${sharingURL}&text=${text}`}
      hoverColor="black"
      icon="i-tabler-brand-x" />
    <SNSButton
      url={`https://www.facebook.com/sharer.php?u=${sharingURL}`}
      hoverColor="#1877f2"
      icon="i-tabler-brand-facebook" />
  </div>
}