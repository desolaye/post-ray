import { GridType } from '@/shared/types/crosswordle'
import Card from '@/shared/ui/card'
import { Crossword } from '@/widgets/crossword'

interface MainProps {
  currentGrid: GridType
  shufflesLeft: number
  onCellSelect?: (i: number, j: number) => void
}

export const Main = (props: MainProps) => {
  const { currentGrid, shufflesLeft, onCellSelect } = props

  return (
    <main className="max-w-xl mx-auto flex flex-col gap-4">
      <Card>
        <Crossword
          current={currentGrid}
          shufflesLeft={shufflesLeft}
          onCellSelect={onCellSelect}
        />
      </Card>
      <Card>
        <p className="text-center text-xl">Осталось замен: {shufflesLeft}</p>
      </Card>
    </main>
  )
}
