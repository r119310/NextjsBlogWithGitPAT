import { siteDescription, siteName } from "@/static/constant";
import type { Metadata } from "next";

interface Props {
  title?: string,
  description?: string,
  url: string,
  imageURL?: string,
  keywords?: string[],
}

export function generateMetadataTemplate(props: Props): Metadata {
  const { title, description, url, imageURL, keywords } = props;
  const outputTitle = title
    ? `${title} - ${siteName}`
    : siteName;
  const outputDescription = description
    ? description
    : siteDescription;
  const outputURL = url
    ? `${process.env.NEXT_PUBLIC_URL}${url}`
    : process.env.NEXT_PUBLIC_URL;

  const metadata: Metadata = {
    title: outputTitle,
    description: outputDescription,
    icons: "/favicon.ico",
    keywords,
    openGraph: {
      title: title ? title : siteName,
      description: outputDescription,
      url: outputURL,
      siteName,
      type: "website",
    },
  };
  return metadata;
}
