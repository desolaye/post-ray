import { CELL_STATUS, CellType, GridType } from '@/shared/types/crosswordle'
import { Cell } from '@/entities/cell'

interface GridProps {
  current: GridType
  shufflesLeft: number
  onCellSelect?: (i: number, j: number) => void
}

export const Crossword = (props: GridProps) => {
  const { current, shufflesLeft, onCellSelect } = props

  const handleCellSelect = (i: number, j: number) => {
    if (onCellSelect) onCellSelect(i, j)
  }

  const isDisabled = (cell: CellType) =>
    cell.status === CELL_STATUS.CORRECT ||
    cell.status === CELL_STATUS.EMPTY ||
    shufflesLeft < 1

  return (
    <section className="flex flex-col gap-1">
      {current.map((line, i) => (
        <div key={i} className="flex gap-1">
          {line.map((cell, j) => (
            <Cell
              key={j}
              data={cell}
              disabled={isDisabled(cell)}
              onCellSelect={() => handleCellSelect(i, j)}
            />
          ))}
        </div>
      ))}
    </section>
  )
}
