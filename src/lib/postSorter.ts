import type { Post } from "@/static/postType";

const numberPattern = /^\d+\.md$/;

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