import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "next/og";
import { getPost } from "@/lib/getPosts";
import TagBanner from "@/components/tag/TagBanner";

export async function GET(req: NextRequest) {
  const param = new URL(req.url).searchParams.get("post")
  if (!param) {
    return NextResponse.json({ error: 'Missing post params' }, { status: 400 });
  }

  const slug = decodeURIComponent(param);
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
      lineHeight: "1.2"
    }}>{data.title}</div>
  </div>,
    {
      width: 1200,
      height: 630,
      status: 200
    }
  )
}