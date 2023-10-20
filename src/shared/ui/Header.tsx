// import Logo from '/logo.svg?react'

export const Header = () => {
  return (
    <header className="flex flex-col bg-lime-100 p-2 shadow">
      <section className="flex justify-between items-center">
        <div className="w-12 h-12">
          <img src="/logo.svg" className="w-full h-full" />
        </div>
        <h1 className="text-xl">Post Ray</h1>
      </section>
    </header>
  )
}
