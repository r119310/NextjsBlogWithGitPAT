export type FetchOptions = RequestInit & {
  next?: { revalidate: number };
};

export function getHeaders() {
  return {
    headers: {
      "Authorization": `token ${process.env.GIT_TOKEN!}`,
      "Content-Type": "application/json",
    }
  };
};

export function getNext(revalidate: number): FetchOptions {
  if (revalidate === 0) {
    return { cache: 'no-store' };
  } else {
    return { next: { revalidate } };
  }
}