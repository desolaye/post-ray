import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: ReactNode
  element?: string
}

export const Portal = (props: PortalProps) => {
  const { children, element = 'app' } = props

  const newParent = document.getElementById(element) as
    | Element
    | DocumentFragment

  return createPortal(children, newParent)
}
