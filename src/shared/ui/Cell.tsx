import classNames from 'classnames'

interface CellProps {
  cell: string
  status: 'correct' | 'nearby' | 'wrong' | 'empty'
}

export const Cell = (props: CellProps) => {
  const { cell, status } = props

  const classes = classNames({
    ['bg-green-300']: status === 'correct',
    ['bg-yellow-300']: status === 'nearby',
    ['bg-gray-300']: status === 'wrong',
    ['opacity-0']: status === 'empty',
  })

  return (
    <button
      className={`w-12 h-12 flex justify-center items-center text-xl font-semibold ${classes}`}
      disabled={status === 'empty'}
    >
      {cell === '@' ? ' ' : cell}
    </button>
  )
}
