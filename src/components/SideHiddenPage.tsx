export function Main({ children }: { children?: React.ReactNode }) {
  return <main className={`md:flex flex-row-reverse flex-grow md:flex-grow-0`}>
    {children}
  </main>
}

export function Side({ children }: { children?: React.ReactNode }) {
  return <div className="hidden md:block bg-gray-100 w-44 lg:min-w-64">
    <div className="w-full sticky top-14">
      {children}
    </div>
  </div>
}

export function Section({ children }: { children?: React.ReactNode }) {
  return <section className="bg-white p-8 rounded-3xl w-full md:w-[34rem] lg:w-[44rem] mx-auto xl:m-0">
    {children}
  </section>
}

export function SectionNoP({ children }: { children?: React.ReactNode }) {
  return <section className="bg-white p-0 overflow-hidden rounded-3xl w-full md:w-[34rem] lg:w-[44rem] mx-auto xl:m-0">
    {children}
  </section>
}

export function Title({ children }: { children: React.ReactNode }) {
  return <h1 className="my-4 text-3xl">
    {children}
  </h1>
}