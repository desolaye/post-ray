import { ReactNode } from 'react'
import { Portal } from '@/shared/ui/portal'

interface ModalLayout {
  children: ReactNode
}

export const ModalLayout = (props: ModalLayout) => {
  const { children } = props

  return (
    <Portal>
      <section className="fixed top-0 left-0 w-full h-screen bg-gray-700 bg-opacity-75 flex justify-center items-center">
        {children}
      </section>
    </Portal>
  )
}
