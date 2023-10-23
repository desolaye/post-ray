import {
  CELL_STATUS,
  Cell as CellType,
  Grid as GridType,
} from '@/shared/types/crosswordle'
import { Cell } from '@/entities/cell'

interface GridProps {
  current: GridType
  shufflesLeft: number
  onCellSelect: (i: number, j: number) => void
}

export const GridUi = (props: GridProps) => {
  const { current, shufflesLeft, onCellSelect } = props

  const isDisabled = (cell: CellType) =>
    cell.status === CELL_STATUS.CORRECT ||
    cell.status === CELL_STATUS.EMPTY ||
    shufflesLeft < 1

  return (
    <section className="flex flex-col gap-1 bg-lime-100 dark:bg-gray-700 w-fit mx-auto p-2 shadow rounded">
      {current.map((line, i) => (
        <div key={i} className="flex gap-1">
          {line.map((cell, j) => (
            <Cell
              key={j}
              data={cell}
              disabled={isDisabled(cell)}
              onCellSelect={() => onCellSelect(i, j)}
            />
          ))}
        </div>
      ))}
    </section>
  )
}
