import { GAME_STATUS, GridType } from '@/shared/types/crosswordle'
import Card from '@/shared/ui/card'
import StarIcon from '@/shared/assets/star-icon.svg?react'

import { Crossword } from '@/widgets/crossword'

interface ResultsProps {
  correctGrid: GridType
  shufflesLeft: number
  gameStatus: GAME_STATUS
  onCopy?: () => void
}

export const Results = (props: ResultsProps) => {
  const { correctGrid, shufflesLeft, gameStatus, onCopy } = props

  return (
    <>
      <Card>
        <p className="text-center text-xl">
          {gameStatus === GAME_STATUS.WIN ? 'Победа!' : 'Поражение...'}
        </p>
        <div className="flex justify-center items-center text-yellow-500">
          <p className="text-xl">{shufflesLeft}</p>
          <div className="w-10 h-10">
            <StarIcon />
          </div>
        </div>
        <p className="text-center">Правильный кроссворд:</p>
        <Crossword current={correctGrid} shufflesLeft={shufflesLeft} />
        <button
          className="border border-z-light shadow-z-light rounded-md p-2 bg-green-500 text-white"
          onClick={onCopy}
        >
          Скопировать результат
        </button>
      </Card>
    </>
  )
}
