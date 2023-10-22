import classNames from 'classnames'

interface CellProps {
  cell: string
  status: 'correct' | 'nearby' | 'wrong' | 'empty'
  selected: boolean
  onSelect: () => void
}

export const Cell = (props: CellProps) => {
  const { cell, status, selected, onSelect } = props

  const classes = classNames(
    'w-10 h-10 sm:w-20 sm:h-20 text-xl sm:text-4xl',
    'font-semibold uppercase text-white',
    {
      'bg-green-500': !selected && status === 'correct',
      'bg-yellow-400': !selected && status === 'nearby',
      'bg-gray-500': !selected && status === 'wrong',
      'opacity-0': status === 'empty',
      'bg-blue-700': selected,
    },
  )

  return (
    <button
      className={`flex justify-center items-center transition-all  ${classes}`}
      onClick={onSelect}
      disabled={status === 'empty' || status === 'correct'}
    >
      {cell === '@' ? null : cell}
    </button>
  )
}
