export default function TipsCard({ children }: { children: React.ReactNode }) {
  return <div className='p-5'>
    <div className='rounded-lg pb-4 bg-amber-200 overflow-hidden'>
      <div className='bg-amber-300 items-center flex px-1.5 py-0.5 mb-2 justify-center gap-1'>
        <span className='i-tabler-help-square-rounded-filled size-6 bg-gray-800' />
        Tips
      </div>
      <div className='px-5'>{children}</div>
    </div>
  </div>
}