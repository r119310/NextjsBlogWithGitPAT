'use client'
import { useState } from 'react';
import type { ClassAttributes, HTMLAttributes } from 'react'
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from "rehype-sanitize";
import type { ExtraProps } from 'react-markdown';

export default function PostIndex({ content, title }: { content: string, title: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const anchorLinkH2 = ({ node, ...props }:
    ClassAttributes<HTMLHeadingElement> &
    HTMLAttributes<HTMLHeadingElement> &
    ExtraProps) => {
    return (
      <li className="list-none w-full"><a
        className="inline-block w-full hover:bg-teal-200 md:hover:bg-gray-200 p-0.5 rounded-md"
        onClick={() => setIsOpen(false)}
        href={"#" + node!.position?.start.line.toString()}
      >
        {props.children}
      </a></li>
    );
  };

  const anchorLinkH3 = ({ node, ...props }:
    ClassAttributes<HTMLHeadingElement> &
    HTMLAttributes<HTMLHeadingElement> &
    ExtraProps) => {
    return (
      <li className="list-none w-full"><a
        className="inline-block w-full hover:bg-teal-200 md:hover:bg-gray-200 p-0.5 pl-4 rounded-md"
        onClick={() => setIsOpen(false)}
        href={"#" + node!.position?.start.line.toString()}
      >
        {props.children}
      </a></li>
    );
  };

  return <div className="px-3 pb-3 pt-3 md:pt-6 flex flex-col">
    <button onClick={() => setIsOpen(!isOpen)} className='bg-slate-200 py-1 px-6 rounded-md hover:bg-slate-300 md:hover:bg-slate-200'>
      目次
    </button>
    <ol className={`${isOpen ? "" : "hidden"} bg-teal-100 absolute top-16 right-0 w-[80vw] border border-teal-400 rounded-md p-4 overflow-y-auto max-h-[calc(100vh_-_14rem)] drop-shadow-xl md:drop-shadow-none md:pt-2 md:pl-2 md:h-auto md:max-h-[calc(100vh_-_14rem)] md:bg-gray-100 md:rounded-none md:border-none md:w-full md:top-0 md:block md:relative`}>
      <li className="list-none w-full"><a
        className="inline-block w-full hover:bg-teal-200 md:hover:bg-gray-200 p-0.5 rounded-md"
        onClick={() => setIsOpen(false)}
        href={"#"}
      >
        {title}
      </a></li>
      <ReactMarkdown
        allowedElements={["h2", "h3"]}
        components={{
          h2: anchorLinkH2,
          h3: anchorLinkH3,
        }}
        rehypePlugins={[rehypeSanitize]}
      >
        {content}
      </ReactMarkdown>
    </ol>
  </div>
}