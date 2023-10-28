import { useEffect } from 'react'

import { getDaily } from '@/shared/api/get-daily'
import { useCrosswordle } from '@/shared/lib/use-crosswordle'
import { Header } from '@/shared/ui/header'

import { Main } from './main'
import { GAME_STATUS } from '@/shared/types/crosswordle'
import { Results } from './results'
import { ModalLayout } from '@/shared/layouts/modal-layout'
import { getClipboardValue } from '@/shared/lib/get-clipboard-value'

export const Game = () => {
  const {
    currentGrid,
    correctGrid,
    gameStatus,
    currentDay,
    shufflesLeft,
    handleCellSelect,
    setBackendData,
    isModalOpen,
    setIsModalOpen,
  } = useCrosswordle()

  const handleCopy = () => {
    setIsModalOpen(false)

    if (currentGrid) {
      const clipboard = getClipboardValue(currentGrid, shufflesLeft, currentDay)
      navigator.clipboard.writeText(clipboard)
    }
  }

  useEffect(() => {
    getDaily().then((data) => setBackendData(data))
  }, [])

  return (
    <article className="flex flex-col gap-4 p-2 max-w-xl mx-auto">
      <Header />

      {currentGrid && (
        <Main
          currentGrid={currentGrid}
          shufflesLeft={shufflesLeft}
          onCellSelect={handleCellSelect}
        />
      )}

      {gameStatus !== GAME_STATUS.IN_GAME && correctGrid && (
        <Results
          onCopy={handleCopy}
          correctGrid={correctGrid}
          gameStatus={gameStatus}
          shufflesLeft={shufflesLeft}
        />
      )}

      {isModalOpen && correctGrid && (
        <ModalLayout>
          <div className="flex flex-col gap-4 px-8">
            <Results
              onCopy={handleCopy}
              correctGrid={correctGrid}
              gameStatus={gameStatus}
              shufflesLeft={shufflesLeft}
            />
          </div>
        </ModalLayout>
      )}
    </article>
  )
}
