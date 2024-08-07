/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight'
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import type { ClassAttributes, HTMLAttributes } from 'react'
import type { ExtraProps } from 'react-markdown';
import '@/styles/post/style.css'
import TagBanner from "@/components/TagBanner";
import DateCard from "@/components/post/DateCard";
import { getImage } from "@/lib/getposts";

function getMimeType(path: string) {
  const ext = path.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    case 'bmp':
      return 'image/bmp';
    default:
      return 'application/octet-stream';
  }
}

async function ExImg({ path, alt }: { path: string, alt?: string }) {
  const image64 = await getImage(path);
  const mimeType = getMimeType(path);
  return <img alt={alt} src={`data:${mimeType};base64,${image64}`} />
}

export default function Article({ data, content }: {
  data: {
    [key: string]: any,
  },
  content: string,
}) {
  const H2 = ({ node, ...props }:
    ClassAttributes<HTMLHeadingElement> &
    HTMLAttributes<HTMLHeadingElement> &
    ExtraProps) => {
    return (
      <div className="scroll-mt-16 border-b mb-4" id={node!.position?.start.line.toString()}>
        <h2 {...props}>{props.children}</h2>
      </div>
    );
  };

  const H3 = ({ node, ...props }:
    ClassAttributes<HTMLHeadingElement> &
    HTMLAttributes<HTMLHeadingElement> &
    ExtraProps) => {
    return (
      <h3 {...props} className="scroll-mt-16" id={node!.position?.start.line.toString()}>{props.children}</h3>
    );
  };

  const Img = ({ node, ...props }:
    ClassAttributes<HTMLImageElement> &
    HTMLAttributes<HTMLImageElement> &
    ExtraProps & { src?: string, alt?: string }) => {
    const src = props.src as string || '';
    const alt = props.alt as string || '';
    if (src.startsWith(`/${process.env.GIT_IMAGES_DIR}/`)) {
      return <ExImg path={src} alt={alt} />
    } else
      return (
        <img {...props}>{props.children}</img>
      );
  };

  const Pre = ({ children, ...props }:
    ClassAttributes<HTMLPreElement> &
    HTMLAttributes<HTMLPreElement> &
    ExtraProps) => {
    if (!children || typeof children !== 'object') {
      return <code {...props}>{children}</code>
    }
    const childType = 'type' in children ? children.type : ''
    if (childType !== 'code') {
      return <code {...props}>{children}</code>
    }

    const childProps = 'props' in children ? children.props : {}
    const { className, children: code } = childProps
    const classList = className ? className.split(':') : []
    const language = classList[0]?.replace('language-', '')
    const fileName = classList[1]

    return (
      <div className="post_codeblock">
        {fileName && (
          <div className="post_fname">
            <span>{fileName}</span>
          </div>
        )}
        <SyntaxHighlighter language={language} style={github}>
          {String(code).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    )
  }

  return <article className="bg-white p-8 rounded-3xl w-full md:w-[34rem] lg:w-[44rem] mx-auto xl:m-0">
    <div className="flex items-center mb-2">
        <DateCard date={data.date} />
        <h1 className="my-4 text-3xl">{data.title}</h1>
      </div>
      {data.tags ?
        <div className="flex flex-wrap gap-3 ml-3 mt-4">
          {(data.tags as string[]).map((tag, i) =>
            <TagBanner tag={tag} key={i} />)}
        </div> :
        <></>}
      <div className="markdown">
        <ReactMarkdown components={{ pre: Pre, h2: H2, h3: H3, img: Img }} remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {content}
        </ReactMarkdown>
      </div>
  </article>
}