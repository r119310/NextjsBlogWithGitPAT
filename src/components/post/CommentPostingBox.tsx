'use client';
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { components } from "./MarkdownElements";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const buttonClassName = "h-12 text-center items-center justify-center flex px-3 rounded-t-lg border-t border-x border-blue-400";

export default function PostingForm({ slug }: { slug: string }) {
  const [inputtedValue, setInputtedValue] = useState<string>("");
  const [isInputting, setIsInputting] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (inputtedValue.trim() === "") {
      alert("コメントの入力が必須です");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comment-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug, comment: inputtedValue }),
      });

      if (response.ok) {
        alert("コメントが送信されました");
        setInputtedValue("");
      } else {
        const data = await response.json();
        alert(`コメントの送信に失敗しました: ${data.error}`);
      }
    } catch (e) {
      console.error("Failed to submit comment:", e);
      alert("コメントの送信に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return <div className="mt-5">
    <div className="flex">
      <button onClick={() => setIsInputting(true)} className={`${buttonClassName} ${isInputting ? "bg-blue-400 text-white" : "bg-blue-100"}`}>
        <b>コメント入力</b>
      </button>
      <button onClick={() => setIsInputting(false)} className={`${buttonClassName} ${!isInputting ? "bg-blue-400 text-white" : "bg-blue-100"}`}>
        <b>プレビュー</b>
      </button>
    </div>
    {isInputting ?
      <textarea
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputtedValue(e.target.value)}
        className="border border-blue-400 p-3 h-48 w-full rounded-t-none"
        value={inputtedValue}
        placeholder="Markdown形式で入力可" /> :
      <div className="markdown p-3 border border-blue-400 w-full rounded-none">
        <ReactMarkdown components={components} remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {inputtedValue}
        </ReactMarkdown>
      </div>
    }
    <div className="mt-3 items-center flex flex-row-reverse">
      <button
        onClick={handleSubmit}
        className="py-2 px-7 text-white bg-blue-500 rounded-lg"
        disabled={isSubmitting}
      >
        <b>{isSubmitting ? "送信中..." : "送信"}</b>
      </button>
    </div>

  </div>
}