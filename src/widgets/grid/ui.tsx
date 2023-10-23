import {
  CELL_STATUS,
  Cell as CellType,
  Grid as GridType,
} from '@/shared/types/crosswordle'
import { Cell } from '@/entities/cell'

interface GridProps {
  data: GridType
  onClick: (i: number, j: number) => void
}

export const Grid = (props: GridProps) => {
  const { data, onClick } = props

  const isDisabled = (cell: CellType) =>
    cell.status === CELL_STATUS.CORRECT || cell.status === CELL_STATUS.EMPTY

  return (
    <section className="flex flex-col gap-2">
      {data.map((line, i) => (
        <div key={i} className="flex gap-2">
          {line.map((cell, j) => (
            <Cell
              key={j}
              data={cell}
              disabled={isDisabled(cell)}
              onClick={() => onClick(i, j)}
            />
          ))}
        </div>
      ))}
    </section>
  )
}
