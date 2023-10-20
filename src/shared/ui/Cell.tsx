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
    <div className={`w-12 h-12 text-center ${classes}`}>
      {cell === '@' ? ' ' : cell}
    </div>
  )
}
