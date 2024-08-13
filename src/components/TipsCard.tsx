export default function TipsCard({ children }: { children: React.ReactNode }) {
  return <div className='transition-colors p-5 dark:text-black'>
    <div className='transition-colors rounded-lg pb-4 bg-amber-200 overflow-hidden dark:bg-blue-300'>
      <div className='transition-colors bg-amber-300 items-center flex px-1.5 py-0.5 mb-2 justify-center gap-1 dark:bg-blue-400'>
        <span className='i-tabler-help-square-rounded-filled size-6 bg-gray-800' />
        Tips
      </div>
      <div className='px-5'>{children}</div>
    </div>
  </div>
}