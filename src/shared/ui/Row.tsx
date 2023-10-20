import { getStatus } from '../model/get-status'
import { Cell } from './Cell'

interface RowProps {
  correct: string[][]
  current: string[][]
  line: string[]
  i: number
  onSelect: (i: number, j: number) => void
  selected: {
    i: number
    j: number
  }
}

export const Row = (props: RowProps) => {
  const { correct, current, line, i, selected, onSelect } = props

  return (
    <div className="flex">
      {line.map((cell, j) => (
        <Cell
          key={j}
          selected={selected?.i === i && selected.j === j}
          cell={cell}
          status={getStatus(correct, current, cell, i, j)}
          onSelect={() => onSelect(i, j)}
        />
      ))}
    </div>
  )
}
