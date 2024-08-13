export const GenerateNotificationBanner = (text: string, success: boolean) => {
  return <div className={`${success ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700 dark:bg-red-300"} transition-colors w-full p-3 rounded-lg my-3`}>
    {text}
  </div>
}

export function ExplainingBanner({ children }: { children: React.ReactNode }) {
  return <div className="transition-colors w-full py-10 bg-gray-100 flex justify-center items-center text-center text-gray-600 dark:bg-slate-700 dark:text-slate-500">
    {children}
  </div>
}