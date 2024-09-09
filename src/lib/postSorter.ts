import type { Post } from '@/static/postType';

const numberPattern = /^\d+\.md$/;

export type TagWithLatestDate = {
  tag: string;
  latestDate: string | null;
};

export function compareSeriesPosts(a: Post, b: Post): number {
  const isANumbered = numberPattern.test(a.slug);
  const isBNumbered = numberPattern.test(b.slug);

  if (isANumbered && isBNumbered) {
    // 両方とも「数字.md」の場合、数字の昇順で比較
    const numA = parseInt(a.slug, 10);
    const numB = parseInt(b.slug, 10);
    return numA - numB;
  } else if (isANumbered) {
    // aが「数字.md」でbがそうでない場合、aを前に
    return -1;
  } else if (isBNumbered) {
    // bが「数字.md」でaがそうでない場合、bを前に
    return 1;
  } else {
    // 両方とも「数字.md」でない場合、dateで比較
    const dateA = a.data.date ? new Date(a.data.date).getTime() : Infinity;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : Infinity;
    return dateA - dateB;
  }
}

export function comparePosts(a: Post, b: Post): number {
  const dateA = a.data.date ? new Date(a.data.date).getTime() : -Infinity;
  const dateB = b.data.date ? new Date(b.data.date).getTime() : -Infinity;

  return dateB - dateA;
}

export function getTagsWithLatestDate(posts: Post[]): TagWithLatestDate[] {
  const tagMap: Record<string, string | null> = {};

  posts.forEach((post) => {
    const { tags, date } = post.data;
    if (tags) {
      tags.forEach((tag) => {
        if (!tagMap[tag]) {
          tagMap[tag] = date || null;
        } else if (date && new Date(date) > new Date(tagMap[tag]!)) {
          tagMap[tag] = date;
        }
      });
    }
  });

  return Object.keys(tagMap).map((tag) => ({
    tag,
    latestDate: tagMap[tag],
  }));
}

export function getTags(posts: Post[]) {
  return Array.from(new Set(posts.filter((post) => post.data.tags).flatMap((post) => post.data.tags as string[])));
}
