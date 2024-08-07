import TagBanner from "@/components/TagBanner";
import { getPost } from "@/lib/getposts";
import { ImageResponse } from "next/og";

export const revalidate = "force-cache";
export const runtime = "nodejs";

export const alt = "OG Image about the post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
  const { data } = await getPost(slug);

  return new ImageResponse(
    (
      <div style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_URL}/ogp_back.png)`,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <p style={{
          fontWeight: "bold",
          width: "70%",
          fontSize: "3rem"
        }}>{data.title}</p>
      </div>
    ),
    {
      ...size,
    }
  );
}
