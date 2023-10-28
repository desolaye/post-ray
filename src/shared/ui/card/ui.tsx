import { ReactNode } from 'react'

interface CardProps {
  children?: ReactNode
}

export const Card = (props: CardProps) => {
  const { children } = props
  return (
    <article className="p-4 border border-z-light rounded-md shadow-z-light w-full flex flex-col gap-4 bg-white">
      {children}
    </article>
  )
}
