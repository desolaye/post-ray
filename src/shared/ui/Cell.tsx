import classNames from 'classnames'

interface CellProps {
  cell: string
  status: 'correct' | 'nearby' | 'wrong' | 'empty'
  selected: boolean
  onSelect: () => void
}

export const Cell = (props: CellProps) => {
  const { cell, status, selected, onSelect } = props

  const classes = classNames({
    'bg-green-300': !selected && status === 'correct',
    'bg-yellow-300': !selected && status === 'nearby',
    'bg-gray-300': !selected && status === 'wrong',
    'opacity-0': status === 'empty',
    'bg-blue-300': selected,
  })

  return (
    <button
      className={`w-12 h-12 flex justify-center items-center text-xl transition-all font-semibold ${classes}`}
      onClick={onSelect}
      disabled={status === 'empty'}
    >
      {cell === '@' ? ' ' : cell}
    </button>
  )
}
