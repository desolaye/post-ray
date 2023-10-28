import { Link } from 'react-router-dom'

export const Nav = () => {
  return (
    <nav className="flex gap-8 justify-between">
      <Link
        to="/daily"
        className="w-full shadow-z-light border border-z-light rounded-md p-2 text-center"
      >
        Daily
      </Link>
      <Link
        to="/practice"
        className="w-full shadow-z-light border border-z-light rounded-md p-2 text-center"
      >
        Practice
      </Link>
    </nav>
  )
}
