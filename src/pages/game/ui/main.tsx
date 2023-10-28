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
    <Card>
      <p className="text-center text-lg">Осталось замен: {shufflesLeft}</p>
      <Crossword
        current={currentGrid}
        shufflesLeft={shufflesLeft}
        onCellSelect={onCellSelect}
      />
    </Card>
  )
}
