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
    'bg-green-500': !selected && status === 'correct',
    'bg-yellow-400': !selected && status === 'nearby',
    'bg-gray-500': !selected && status === 'wrong',
    'opacity-0': status === 'empty',
    'bg-blue-700': selected,
  })

  return (
    <button
      className={`w-11 h-11 sm:w-20 sm:h-20 sm:text-4xl flex text-white justify-center items-center text-2xl transition-all font-semibold ${classes}`}
      onClick={onSelect}
      disabled={status === 'empty' || status === 'correct'}
    >
      {cell === '@' ? ' ' : cell}
    </button>
  )
}
