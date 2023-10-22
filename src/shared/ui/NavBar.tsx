import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'

const links = [
  {
    name: 'Ежедневник',
    path: '/daily',
  },
  {
    name: 'Практика',
    path: '/practice',
  },
]

export const NavBar = () => {
  const { pathname } = useLocation()

  return (
    <nav className="flex gap-2 justify-between px-2">
      {links.map((link, i) => (
        <Link
          to={link.path}
          key={i}
          className={classNames(
            'w-full text-center border rounded p-1 transition-all',
            {
              'bg-lime-100 shadow-inner': pathname === link.path,
              'border-lime-300 shadow bg-white': pathname !== link.path,
            },
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  )
}
