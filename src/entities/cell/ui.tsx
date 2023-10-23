import { CELL_STATUS, Cell as CellType } from '@/shared/types/crosswordle'
import classNames from 'classnames'

interface CellProps {
  data: CellType
  disabled: boolean
  onCellSelect: () => void
}

export const Cell = (props: CellProps) => {
  const { data, disabled, onCellSelect } = props
  const { letter, status } = data

  const classes = classNames(
    'w-11 h-11 sm:w-20 sm:h-20',
    'uppercase text-white text-xl font-black sm:text-3xl',
    'rounded transition-all',
    {
      'bg-gray-500': status === CELL_STATUS.WRONG,
      'bg-green-500': status === CELL_STATUS.CORRECT,
      'bg-yellow-500': status === CELL_STATUS.NEARBY,
      'bg-blue-500': status === CELL_STATUS.SELECTED,
    },
  )

  return (
    <button onClick={onCellSelect} disabled={disabled} className={classes}>
      <p>{letter}</p>
    </button>
  )
}
