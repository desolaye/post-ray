import { useEffect, useState } from 'react'

import { BackendCrosswordleType } from '@/shared/types/backend-data'
import { getDaily } from '@/shared/api/get-daily'
import { getGameStatus } from '@/shared/lib/get-game-status'
import { getClipboardValue } from '@/shared/lib/get-clipboard-value'

import { ModalLayout } from '@/shared/layouts/modal-layout'
import { Header } from '@/shared/ui/header'
import { GameEndCard } from '@/shared/ui/game-end-card'

import {
  GAME_STATUS,
  GameStatus,
  Grid as GridType,
} from '@/shared/types/crosswordle'

import { Grid } from '@/widgets/grid'

export const Game = () => {
  const [shufflesLeft, setShufflesLeft] = useState(19)
  const [crosswordle, setCrosswordle] = useState<BackendCrosswordleType>()
  const [current, setCurrent] = useState<GridType>()
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    isModalOpen: false,
    status: GAME_STATUS.IN_GAME,
  })

  const handleShuffle = () => {
    setShufflesLeft((prev) => prev - 1)
  }

  const handleShare = () => {
    if (current) {
      const data = getClipboardValue(current, shufflesLeft)
      navigator.clipboard.writeText(data)
      setGameStatus({ ...gameStatus, isModalOpen: false })
    }
  }

  useEffect(() => {
    getDaily().then((data) => {
      if (data) {
        setCrosswordle(data)
        setShufflesLeft(data.shuffles)
      }
    })
  }, [])

  useEffect(() => {
    if (current) {
      const status = getGameStatus(current)
      if (status) setGameStatus({ status: GAME_STATUS.WIN, isModalOpen: true })
      if (!status && shufflesLeft < 1)
        setGameStatus({ status: GAME_STATUS.LOSE, isModalOpen: true })
    }
  }, [shufflesLeft])

  useEffect(() => {
    if (current) {
      const status = getGameStatus(current)
      if (status) setGameStatus({ status: GAME_STATUS.WIN, isModalOpen: true })
    }
  }, [current])

  return (
    <article className="min-h-screen bg-gray-100 dark:bg-gray-500 dark:text-white flex flex-col gap-4">
      <Header />

      {crosswordle && (
        <>
          <Grid
            shufflesLeft={shufflesLeft}
            crosswordle={crosswordle}
            onShuffle={handleShuffle}
            onCurrentChange={setCurrent}
          />
          <p className="text-xl text-center">Осталось замен: {shufflesLeft}</p>
        </>
      )}

      {gameStatus.isModalOpen && (
        <ModalLayout>
          <GameEndCard
            shufflesLeft={shufflesLeft}
            status={gameStatus.status}
            onShare={handleShare}
          />
        </ModalLayout>
      )}
    </article>
  )
}
