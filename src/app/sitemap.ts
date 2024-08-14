import { getPostsProps } from "@/lib/getPosts";
import { lastModified } from "@/static/constant";
import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const staticPaths = [
  "/post",
  "/profile",
  "/series",
  "/tags"
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostsProps();
  const tags: string[] = Array.from(new Set(posts
    .filter((post) => post.data.tags)
    .flatMap((post) => post.data.tags as string[])
  ));
  const baseURL = process.env.NEXT_PUBLIC_URL!;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseURL,
      lastModified,
      changeFrequency: "never",
      priority: 1.0,
    }
  ];

  staticPaths.forEach((page) => {
    staticPages.push({
      url: baseURL + page,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.9
    })
  })

  const dynamicPages: MetadataRoute.Sitemap = [];

  tags.forEach((tag) => {
    dynamicPages.push({
      url: baseURL + "/tags/" + encodeURIComponent(tag),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8
    })
  })

  return [...staticPages, ...dynamicPages];
}
