'use client';
import { useState } from "react";
import { CommentMarkdown } from "./MarkdownElements";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { GenerateNotificationBanner, ExplainingBanner } from "../UserBanner";

const buttonClassName = "h-12 text-center items-center justify-center flex px-3 rounded-t-lg border-t border-x border-blue-400";

export default function PostingForm({ slug }: { slug: string }) {
  const [inputtedValue, setInputtedValue] = useState<string>("");
  const [isInputting, setIsInputting] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notificationBanner, setNotificationBanner] = useState<React.ReactNode>()
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async () => {
    setNotificationBanner(null);

    if (inputtedValue.trim() === "") {
      setNotificationBanner(GenerateNotificationBanner("コメントの入力が必須です", false));
      return;
    }

    if (!executeRecaptcha) {
      setNotificationBanner(GenerateNotificationBanner("ReCaptcha を実行できませんでした", false));
      return;
    }

    const token = await executeRecaptcha('submitComment');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comment-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug, comment: inputtedValue, token }),
      });

      if (response.ok) {
        setNotificationBanner(GenerateNotificationBanner("コメントが送信されました", true));
        setInputtedValue("");
      } else {
        const data = await response.json();
        setNotificationBanner(GenerateNotificationBanner(`コメントの送信に失敗しました: ${data.error}`, false));
      }
    } catch (e) {
      setNotificationBanner(GenerateNotificationBanner(`コメントの送信に失敗しました: ${e}`, false));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-5">
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
          className="border border-blue-400 p-3 h-56 w-full rounded-t-none"
          value={inputtedValue}
          placeholder="Markdown形式で入力可" /> :
        <div className="p-3 border border-blue-400 w-full rounded-none">
          {inputtedValue.trim() !== "" ? <CommentMarkdown content={inputtedValue} /> :
            <ExplainingBanner>
              「コメント入力」で入力後、プレビューをお試しください
            </ExplainingBanner>}
        </div>
      }
      <div className="mt-3 items-center flex flex-row-reverse gap-5">
        <button
          onClick={handleSubmit}
          className={`py-2 px-7 ${isSubmitting ? "text-gray-600 bg-gray-400" : "text-white bg-blue-500 hover:bg-blue-600"} rounded-lg`}
          disabled={isSubmitting}
        >
          <b>{isSubmitting ? "送信中..." : "送信"}</b>
        </button>
        <div className="flex-1 text-sm text-gray-600">
          This site is protected by reCAPTCHA and the Google <a target="_blank" rel="noopener noreferrer" className="text-blue-600 underline" href="https://policies.google.com/privacy">Privacy Policy</a> and <a target="_blank" rel="noopener noreferrer" className="text-blue-600 underline" href="https://policies.google.com/terms">Terms of Service</a> apply.
        </div>
      </div>
      {notificationBanner ? notificationBanner : <></>}
    </div>
  )
}