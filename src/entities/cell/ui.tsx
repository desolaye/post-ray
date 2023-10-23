import { CELL_STATUS, Cell as CellType } from '@/shared/types/crosswordle'
import classNames from 'classnames'

interface CellProps {
  data: CellType
  disabled: boolean
  onClick: () => void
}

export const Cell = (props: CellProps) => {
  const { data, disabled, onClick } = props
  const { letter, status } = data

  const classes = classNames('w-10 h-10', 'rounded', {
    'bg-gray-100': status === CELL_STATUS.WRONG,
    'bg-green-100': status === CELL_STATUS.CORRECT,
    'bg-yellow-100': status === CELL_STATUS.NEARBY,
    'bg-blue-100': status === CELL_STATUS.SELECTED,
  })

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      <p>{letter}</p>
    </button>
  )
}
