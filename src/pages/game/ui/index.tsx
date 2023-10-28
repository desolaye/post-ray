import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { getDaily } from '@/shared/api/get-daily'
import { getPractice } from '@/shared/api/get-practice'
import { GAME_STATUS, SavedCrosswordle } from '@/shared/types/crosswordle'
import { getClipboardValue } from '@/shared/lib/get-clipboard-value'
import { useCrosswordle } from '@/shared/lib/use-crosswordle'
import { ModalLayout } from '@/shared/layouts/modal-layout'
import { Header } from '@/shared/ui/header'

import { Results } from './results'
import { Main } from './main'
import { Nav } from '@/shared/ui/nav'

interface GameProps {
  isPractice?: boolean
}

export const Game = (props: GameProps) => {
  const { isPractice } = props
  const { pathname } = useLocation()

  const {
    currentGrid,
    correctGrid,
    gameStatus,
    shufflesLeft,
    isModalOpen,
    selectedCell,
    handleCellSelect,
    setBackendData,
    setIsModalOpen,
    handleSavedData,
    setIsPractice,
    saveLocalData,
  } = useCrosswordle()

  const handleCopy = () => {
    setIsModalOpen(false)
    const clipboard = getClipboardValue()
    navigator.clipboard.writeText(clipboard)
  }

  useEffect(() => {
    setBackendData(undefined)

    if (isPractice) {
      getPractice().then((data) => {
        setIsPractice(true)
        setBackendData(data)
      })
    } else {
      getDaily().then((data) => {
        setBackendData(data)

        const localData = localStorage.getItem('ru-crossword')
        if (localData) handleSavedData(JSON.parse(localData))
      })
    }
  }, [pathname])

  useEffect(() => {
    const localData = localStorage.getItem('ru-crossword')

    if (currentGrid && localData && !selectedCell) {
      const local: SavedCrosswordle = JSON.parse(localData)

      if (local.shufflesLeft < shufflesLeft) {
        if (!isPractice) handleSavedData(local)
      } else {
        if (!isPractice) saveLocalData(local.streak, gameStatus)
      }
    }
  }, [currentGrid, gameStatus])

  return (
    <article className="flex flex-col gap-4 p-2 max-w-xl mx-auto">
      <Header />
      <Nav />

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
