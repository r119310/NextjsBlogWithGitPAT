export type PostData = {
  title: string;
  tags?: string[];
  date?: string;
  series?: string;
  [key: string]: any;
};

export type Post = {
  slug: string;
  excerpt: string;
  data: PostData;
};

export type SeriesData = {
  name: string;
  description?: string;
  [key: string]: any;
};
