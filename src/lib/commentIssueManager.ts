import { Comment, Issue } from "@/static/issueType";
import { cache } from "react";

const issueCreationMap: Record<string, Promise<void> | undefined> = {};

const getHeaders = () => {
  return {
    "Authorization": `token ${process.env.GIT_TOKEN}`,
    "Content-Type": "application/json",
  };
};

const getNext = (revalidate: number) => {
  return { revalidate };
};

const gitContentPath = `https://api.github.com/repos/${process.env.GIT_USERNAME}/${process.env.GIT_REPO}/issues`;

const getFilteredIssuePath = (slug: string) =>
  `${gitContentPath}?q=${encodeURIComponent(slug)}+in:title`;

async function getIssue(slug: string) {
  const data = await fetch(getFilteredIssuePath(slug), {
    headers: getHeaders(),
    next: getNext(0),
  })
    .then((res) => res.json())
    .catch((e) => console.error(e));

  if (data && data.length > 0) {
    const issue = data.find((item: any) => item.title === slug);
    if (issue) {
      return {
        slug: issue.title as string,
        commentsURL: issue.comments_url as string,
        locked: issue.locked as boolean
      };
    }
  }
  return null;
}

const createIssue = cache(async (slug: string) => {
  if (!issueCreationMap[slug]) {
    issueCreationMap[slug] = (async () => {
      const title = slug;
      const body = "コメントリスト";
      const labels = ["user-comment"];

      const data = {
        title,
        body,
        labels,
      };

      const res = await fetch(gitContentPath, {
        method: "POST",
        body: JSON.stringify(data),
        headers: getHeaders(),
      })
        .then((res) => {
          if (res.status !== 201)
            console.error(`Error creating issue: ${res.status} - ${res.statusText}`);
        })
        .catch((e) => console.error(e));
    })();

    issueCreationMap[slug].finally(() => {
      delete issueCreationMap[slug];
    });

    return issueCreationMap[slug];
  } else {
    return issueCreationMap[slug];
  }
});

export const getCommentList = cache(async (slug: string): Promise<Issue> => {
  const targetIssue = await getIssue(slug);

  if (targetIssue) {
    const data = await fetch(targetIssue.commentsURL, {
      headers: getHeaders(),
      next: getNext(5),
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));

    const comments: Comment[] = [];
    for (const item of data) {
      const date = new Date(item.created_at as string);
      comments.push({
        date: date.toLocaleString("ja-JP"),
        content: item.body as string,
      });
    }
    return {
      comments,
      locked: targetIssue.locked
    };
  } else {
    await createIssue(slug);
    return {
      comments: [],
      locked: false
    }
  }
});
