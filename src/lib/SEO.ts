import { author, siteDescription, siteName } from "@/static/constant";
import type { Metadata } from "next";
import { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";

interface Props {
  title?: string,
  description?: string,
  url: string,
  imageURL?: string,
  keywords?: string[],
  type?: OpenGraphType,
}

export function generateMetadataTemplate(props: Props): Metadata {
  const { title, description, url, keywords, type } = props;
  const outputTitle = title
    ? `${title} - ${siteName}`
    : siteName;
  const outputDescription = description
    ? description
    : siteDescription;
  const outputType: OpenGraphType = type ? type : "website";

  const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
    authors: { name: author.name, url: author.url },
    title: outputTitle,
    description: outputDescription,
    icons: "/favicon.ico",
    keywords,
    openGraph: {
      title: title ? title : siteName,
      description: outputDescription,
      url: url,
      siteName,
      type: outputType,
    },
  };
  return metadata;
}
