import { getStatus } from '../model/get-status'
import { Cell } from './Cell'

interface RowProps {
  correct: string[][]
  current: string[][]
  line: string[]
  i: number
}

export const Row = (props: RowProps) => {
  const { correct, current, line, i } = props

  return (
    <div className="flex">
      {line.map((cell, j) => (
        <Cell
          key={j}
          cell={cell}
          status={getStatus(correct, current, cell, i, j)}
        />
      ))}
    </div>
  )
}
