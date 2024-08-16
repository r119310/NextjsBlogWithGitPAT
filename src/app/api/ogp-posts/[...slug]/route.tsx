import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { getPost } from "@/lib/getPosts";

export async function GET(req: NextRequest, context: { params: { slug: string[] } }) {
  const slug = decodeURIComponent(context.params.slug.join('/'));
  const { data } = await getPost(`${process.env.GIT_POSTS_DIR!}/${slug}.md`);

  return new ImageResponse(<div style={{
    width: "100%",
    height: "100%",
    backgroundImage: `url(${process.env.NEXT_PUBLIC_URL}/ogp_back.png)`,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    fontSize: "50px"
  }}>
    <div style={{
      width: "70%",
      lineHeight: "1.2",
      fontWeight: "bold"
    }}>{data.title}</div>
  </div>,
    {
      width: 1200,
      height: 630,
      status: 200
    }
  )
}