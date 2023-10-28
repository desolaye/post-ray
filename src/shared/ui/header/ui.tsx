import { useState } from 'react'

import { ModalLayout } from '@/shared/layouts/modal-layout'
import SettingsIcon from '@/shared/assets/settings-icon.svg?react'

import Card from '../card'

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCacheClear = () => {
    setIsModalOpen(false)
    localStorage.removeItem('ru-crossword')
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  return (
    <header className="p-2 flex justify-between items-center">
      <h1 className="text-center text-xl">Crosswordle</h1>
      <button className="w-10 h-10" onClick={() => setIsModalOpen(true)}>
        <SettingsIcon />
      </button>
      {isModalOpen && (
        <ModalLayout>
          <div className="mx-auto max-w-xl w-full">
            <Card>
              <div className="flex gap-4 justify-between">
                <button
                  className="w-full border border-z-light p-2 shadow rounded"
                  onClick={handleClose}
                >
                  Закрыть
                </button>
                <button
                  className="w-full border border-red-500 text-red-500 p-2 shadow rounded"
                  onClick={handleCacheClear}
                >
                  Очистить кэш
                </button>
              </div>
            </Card>
          </div>
        </ModalLayout>
      )}
    </header>
  )
}
