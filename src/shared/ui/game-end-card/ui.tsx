import { GAME_STATUS } from '@/shared/types/crosswordle'
import StarIcon from '@/shared/assets/star-icon.svg?react'

interface GameEndCardProps {
  status: GAME_STATUS
  shufflesLeft: number
  onShare: () => void
}

export const GameEndCard = (props: GameEndCardProps) => {
  const { status, shufflesLeft, onShare } = props

  return (
    <section className="flex flex-col gap-4 bg-lime-700 bg-opacity-75 text-white p-4 rounded shadow max-w-xs">
      <header className="text-center text-xl">
        <p>
          {status === GAME_STATUS.WIN && 'Победа'}
          {status === GAME_STATUS.LOSE && 'Поражение'}
        </p>
      </header>
      <main>
        {status === GAME_STATUS.WIN && (
          <section className="flex gap-2 flex-wrap justify-center">
            {new Array(shufflesLeft).fill(0).map((_, i) => (
              <div className="w-10 h-10 text-yellow-500" key={i}>
                <StarIcon />
              </div>
            ))}
          </section>
        )}
      </main>
      <footer>
        <button
          className="border border-white w-full px-2 py-1 rounded shadow"
          onClick={onShare}
        >
          Поделиться результатом
        </button>
      </footer>
    </section>
  )
}
