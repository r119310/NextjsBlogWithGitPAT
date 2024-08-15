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
  const { title, description, url, imageURL, keywords, type } = props;
  const outputTitle = title
    ? `${title} - ${siteName}`
    : siteName;
  const outputDescription = description
    ? description
    : siteDescription;
  const outputType: OpenGraphType = type ? type : "website";

  let metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
    authors: { name: author.name, url: author.url },
    title: outputTitle,
    description: outputDescription,
    icons: {
      icon: "/favicon.ico",
      other: [{
        rel: "icon",
        type: "image/x-icon",
        url: "/favicon.ico"
      },
      {
        url: "/feed",
        rel: "alternate",
        type: "application/atom+xml"
      }]
    },
    keywords,
    openGraph: {
      title: title ? title : siteName,
      description: outputDescription,
      url: url,
      siteName,
      images: imageURL ?? undefined,
      type: outputType,
    },
  };

  if (imageURL) metadata = {
    ...metadata, twitter: {
      card: "summary_large_image",
      images: imageURL,
      title: outputTitle,
      description: outputDescription,
    }
  }
  return metadata;
}
