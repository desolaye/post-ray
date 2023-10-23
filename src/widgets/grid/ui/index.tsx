import { useEffect, useState } from 'react'

import { Grid as GridType, SelectedCell } from '@/shared/types/crosswordle'
import { BackendCrosswordleType } from '@/shared/types/backend-data'
import { convertToGrid } from '@/shared/lib/convert-to-grid'
import { swapCells } from '@/shared/lib/swap-cells'
import { updateStatus } from '@/shared/lib/update-status'

import { GridUi } from './grid-ui'

interface GridProps {
  crosswordle: BackendCrosswordleType
  shufflesLeft: number
  onShuffle: () => void
  onCurrentChange: (current?: GridType) => void
}

export const Grid = (props: GridProps) => {
  const { crosswordle, shufflesLeft, onShuffle, onCurrentChange } = props

  const [currentGrid, setCurrentGrid] = useState<GridType>()
  const [correctGrid, setCorrectGrid] = useState<GridType>()
  const [selectedCell, setSelectedCell] = useState<SelectedCell>()

  const setupGrid = (data: BackendCrosswordleType) => {
    const { currentGrid, correctGrid } = convertToGrid(data)

    setCorrectGrid(correctGrid)
    setCurrentGrid(currentGrid)

    const copy = updateStatus(currentGrid, correctGrid, selectedCell)
    setCurrentGrid(copy)
  }

  const handleCellSelect = (i: number, j: number) => {
    if (selectedCell && currentGrid) {
      swapCells(currentGrid, selectedCell, { i, j })
      setSelectedCell(undefined)
      onShuffle()
    }

    if (!selectedCell) setSelectedCell({ i, j })
  }

  useEffect(() => {
    setupGrid(crosswordle)
  }, [])

  useEffect(() => {
    if (currentGrid && correctGrid) {
      const copy = updateStatus(currentGrid, correctGrid, selectedCell)
      setCurrentGrid(copy)
    }
  }, [shufflesLeft, selectedCell])

  useEffect(() => {
    onCurrentChange(currentGrid)
  }, [currentGrid])

  return (
    currentGrid && (
      <GridUi
        current={currentGrid}
        onCellSelect={handleCellSelect}
        shufflesLeft={shufflesLeft}
      />
    )
  )
}
