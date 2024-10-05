/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { getImage } from '@/lib/getPosts';
import { ClassAttributes, HTMLAttributes } from 'react';
import ReactMarkdown, { Components, ExtraProps } from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import CopyToClipboard from './CopyToClipboard';
import { HeadMeta } from '@/static/metaType';
import * as React from 'react';
import { makeExcerpt } from '@/lib/textFormatter';
import { getImageMimeType } from '@/lib/mime-getter';

async function ExImg({ path, alt }: { path: string; alt?: string }) {
  const image64 = await getImage(path);
  const mimeType = getImageMimeType(path);
  return <img alt={alt} src={`data:${mimeType};base64,${image64}`} />;
}

async function ExA({ path, isInner }: { path: string; isInner: boolean }) {
  const CardComponent = ({ meta }: { meta: HeadMeta }) => {
    const titleBase = meta['og:title'] ? meta['og:title'] : meta.title ? meta.title : meta.url;
    const title = makeExcerpt(titleBase, 20);
    const descriptionBase = meta['og:description'] ? meta['og:description'] : meta.description ? meta.description : '';
    const description = makeExcerpt(descriptionBase, 15);
    return (
      <span className='my-4 flex h-24 w-full justify-between gap-1 overflow-hidden rounded-md border border-slate-100 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700'>
        <span className='flex flex-col justify-between overflow-hidden px-3 py-4'>
          <span className='flex flex-col gap-0.5'>
            <span className='block whitespace-nowrap font-bold'>{title}</span>
            <span className='block whitespace-nowrap text-xs'>{description}</span>
          </span>
          <span className='block'>
            <span className='block whitespace-nowrap text-xs'>
              <span className='i-tabler-world relative top-0.5 mr-0.5 bg-gray-700 dark:bg-slate-500' />
              {makeExcerpt(meta.url, 36)}
            </span>
          </span>
        </span>
        {meta['og:image'] ? (
          <span className='flex h-full flex-col items-center justify-center overflow-hidden'>
            <img className='m-0 h-full w-auto' alt='thumb' src={meta['og:image']} />
          </span>
        ) : (
          <></>
        )}
      </span>
    );
  };

  const metaResponse = await fetch(`${process.env.NEXT_PUBLIC_URL!}/api/get-head?url=${encodeURIComponent(path)}`, {
    next: { revalidate: 3600 * 24 },
  });
  const meta = (await metaResponse.json()).meta;
  return isInner ? (
    <a href={path}>
      <CardComponent meta={meta} />
    </a>
  ) : (
    <a href={path} target='_blank' rel='noopener noreferrer'>
      <CardComponent meta={meta} />
    </a>
  );
}

const H2 = ({
  node,
  ...props
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement> & ExtraProps) => {
  return (
    <div
      className='mb-4 scroll-mt-16 border-b transition-colors dark:border-slate-700 dark:text-white'
      id={node!.position?.start.line.toString()}
    >
      <h2 {...props}>{props.children}</h2>
    </div>
  );
};

const H3 = ({
  node,
  ...props
}: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement> & ExtraProps) => {
  return (
    <h3
      {...props}
      className='scroll-mt-16 transition-colors dark:text-white'
      id={node!.position?.start.line.toString()}
    >
      {props.children}
    </h3>
  );
};

const Img = ({
  ...props
}: ClassAttributes<HTMLImageElement> &
  HTMLAttributes<HTMLImageElement> &
  ExtraProps & { src?: string; alt?: string }) => {
  const src = (props.src as string) || '';
  const alt = (props.alt as string) || '';
  if (src.startsWith(`/${process.env.GIT_IMAGES_DIR!}/`)) {
    return <ExImg path={src} alt={alt} />;
  } else return <img {...props}>{props.children}</img>;
};

const Pre = ({ children, ...props }: ClassAttributes<HTMLPreElement> & HTMLAttributes<HTMLPreElement> & ExtraProps) => {
  if (!children || typeof children !== 'object') {
    return <code {...props}>{children}</code>;
  }
  const childType = 'type' in children ? children.type : '';
  if (childType !== 'code') {
    return <code {...props}>{children}</code>;
  }

  const childProps = 'props' in children ? children.props : {};
  const { className, children: code } = childProps;
  const classList = className ? className.split(':') : [];
  const language = classList[0]?.replace('language-', '');
  const fileName = classList[1];

  return (
    <div className='post_codeblock w-full'>
      {fileName && (
        <div className='post_fname'>
          <span>{fileName}</span>
        </div>
      )}
      <SyntaxHighlighter language={language} style={atomOneDark}>
        {String(code).replace(/\n$/, '')}
      </SyntaxHighlighter>
      <CopyToClipboard text={String(code).replace(/\n$/, '')} />
    </div>
  );
};

const A = ({
  href,
  children,
  ...props
}: ClassAttributes<HTMLAnchorElement> &
  HTMLAttributes<HTMLAnchorElement> & { href?: string; children?: React.ReactNode }) => {
  const isInternalLink = href?.startsWith('/');
  const displayText = typeof children === 'string' ? children : '';

  if (href && displayText === href) {
    return <ExA path={href} isInner={isInternalLink ?? false} />;
  }

  return isInternalLink ? (
    <a className='post_hyper_url' href={href} {...props}>
      {children}
    </a>
  ) : (
    <a className='post_hyper_url' href={href} target='_blank' rel='noopener noreferrer' {...props}>
      {children}
    </a>
  );
};

export const components: Partial<Components> = {
  pre: Pre,
  h2: H2,
  h3: H3,
  img: Img,
  a: A,
};

export function PostMarkdown({ content }: { content: string }) {
  return (
    <div className='markdown'>
      <ReactMarkdown
        disallowedElements={['h1']}
        components={components}
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export function CommentMarkdown({ content }: { content: string }) {
  return (
    <div className='markdown'>
      <ReactMarkdown
        disallowedElements={['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'iframe', 'script']}
        components={components}
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
