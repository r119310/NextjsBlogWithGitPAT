import Link from "next/link";

export function InnerLinkBlueButton({ path, text }: { path: string, text: string }) {
  return <div><Link href={path}>
    <div className='transition-colors border-blue-600 border-2 bg-blue-500 hover:bg-blue-600 py-2 px-4 text-lg text-white drop-shadow-xl rounded-3xl'>{text}</div>
  </Link></div>
}