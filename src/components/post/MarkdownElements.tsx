/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { getImage } from "@/lib/getposts";
import { ClassAttributes, HTMLAttributes } from "react";
import ReactMarkdown, { Components, ExtraProps } from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import CopyToClipboard from "./CopyToClipboard";

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

const H2 = ({ node, ...props }:
  ClassAttributes<HTMLHeadingElement> &
  HTMLAttributes<HTMLHeadingElement> &
  ExtraProps) => {
  return (
    <div className="transition-colors scroll-mt-16 border-b mb-4 dark:border-slate-700" id={node!.position?.start.line.toString()}>
      <h2 {...props}>{props.children}</h2>
    </div>
  );
};

const H3 = ({ node, ...props }:
  ClassAttributes<HTMLHeadingElement> &
  HTMLAttributes<HTMLHeadingElement> &
  ExtraProps) => {
  return (
    <h3 {...props} className="scroll-mt-16"
      id={node!.position?.start.line.toString()}>{props.children}</h3>
  );
};

const Img = ({ node, ...props }:
  ClassAttributes<HTMLImageElement> &
  HTMLAttributes<HTMLImageElement> &
  ExtraProps & { src?: string, alt?: string }) => {
  const src = props.src as string || '';
  const alt = props.alt as string || '';
  if (src.startsWith(`/${process.env.GIT_IMAGES_DIR!}/`)) {
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
    <div className="post_codeblock w-full">
      {fileName && (
        <div className="post_fname">
          <span>{fileName}</span>
        </div>
      )}
      <SyntaxHighlighter language={language} style={atomOneDark}>
        {String(code).replace(/\n$/, '')}
      </SyntaxHighlighter>
      <CopyToClipboard text={String(code).replace(/\n$/, '')} />
    </div>
  )
}

export const components: Partial<Components> = {
  pre: Pre, h2: H2, h3: H3, img: Img
}

export function PostMarkdown({ content }: { content: string }) {
  return <div className="markdown">
    <ReactMarkdown
      disallowedElements={["h1"]}
      components={components}
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeRaw]}>
      {content}
    </ReactMarkdown>
  </div>
}

export function CommentMarkdown({ content }: { content: string }) {
  return <div className="markdown">
    <ReactMarkdown
      disallowedElements={["h1", "h2", "h3", "h4", "h5", "h6", "iframe", "script"]}
      components={components}
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}>
      {content}
    </ReactMarkdown>
  </div>
}