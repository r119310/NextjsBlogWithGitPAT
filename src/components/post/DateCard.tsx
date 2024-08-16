export default function DateCard({ date }: { date?: string }) {
  const formattedDate = date ? new Date(date.replace(/-/g, "/")) : undefined;

  return <time dateTime={formattedDate?.toISOString()}><div className="flex items-center">
    <span className='-rotate-90 text-sm w-6 ml-2 translate-y-4 leading-4'>
      {formattedDate ? formattedDate.getFullYear() : ""}
    </span>
    <div className='transition-colors bg-gray-100 size-16 rounded-xl mr-4 items-center flex flex-col justify-center dark:bg-slate-700'>
      {formattedDate ? <div className='text-center'>
        <div className='text-sm leading-4'>{formattedDate.getMonth() + 1}</div>
        <div className='text-2xl leading-6'>{formattedDate.getDate()}</div>
      </div> : <span className='text-3xl'>🎉</span>}
    </div>
  </div></time>
}