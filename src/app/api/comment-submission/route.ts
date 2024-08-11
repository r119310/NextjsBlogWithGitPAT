import { NextRequest, NextResponse } from 'next/server';
import { LRUCache } from 'lru-cache';

const rateLimit = new LRUCache<string, number>({
  max: 1000,
  ttl: 1000 * 60 * 60,
});

const getHeaders = () => {
  return {
    "Authorization": `token ${process.env.GIT_TOKEN}`,
    "Content-Type": "application/json",
  };
};

export async function POST(req: NextRequest) {
  const { slug, comment } = await req.json();
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';

  if (!slug || !comment) {
    return NextResponse.json({ error: 'Missing slug or comment body' }, { status: 400 });
  }

  const requestCount = rateLimit.get(ip) || 0;
  if (requestCount > 10) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  rateLimit.set(ip, requestCount + 1);

  try {
    const issueResponse = await fetch(`https://api.github.com/repos/${process.env.GIT_USERNAME}/${process.env.GIT_REPO}/issues`, {
      headers: getHeaders(),
    });
    const issues = await issueResponse.json();
    const issue = issues.find((issue: any) => issue.title === slug);

    if (!issue) {
      return NextResponse.json({ error: `Issue with slug "${slug}" not found` }, { status: 404 });
    }

    // コメントの追加
    const commentsURL = issue.comments_url;
    const data = {
      body: comment,
    };

    const response = await fetch(commentsURL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Comment added successfully' }, { status: 200 });
    } else {
      const errorText = await response.text();
      return NextResponse.json({ error: `Failed to add comment: ${errorText}` }, { status: response.status });
    }

  } catch (e) {
    console.error('Error adding comment:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
