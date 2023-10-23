import { useEffect, useState } from 'react'

import { Grid as GridType, SelectedCell } from '@/shared/types/crosswordle'
import { BackendCrosswordleType } from '@/shared/types/backend-data'

import { convertToGrid } from '@/shared/lib/convert-to-grid'
import { updateStatus } from '@/shared/lib/update-status'

import { getDaily } from '@/shared/api/get-daily'
import { Loader } from '@/shared/ui/loader'

import { Grid } from '@/widgets/grid'
import { swapCells } from '@/shared/lib/swap-cells'

export const Game = () => {
  const [shufflesLeft, setShufflesLeft] = useState(19)
  const [currentGrid, setCurrentGrid] = useState<GridType>()
  const [correctGrid, setCorrectGrid] = useState<GridType>()
  const [selectedCell, setSelectedCell] = useState<SelectedCell>()

  const handleRequest = (data: BackendCrosswordleType) => {
    const { currentGrid, correctGrid } = convertToGrid(data)

    setCorrectGrid(correctGrid)
    setCurrentGrid(currentGrid)
    setShufflesLeft(data.shuffles)
  }

  const onClick = (i: number, j: number) => {
    if (selectedCell && currentGrid) {
      swapCells(currentGrid, selectedCell, { i, j })
      setSelectedCell(undefined)
      setShufflesLeft((prev) => prev - 1)
    }

    if (!selectedCell) setSelectedCell({ i, j })
  }

  useEffect(() => {
    getDaily().then((data) => {
      if (data) handleRequest(data)
    })
  }, [])

  useEffect(() => {
    if (currentGrid && correctGrid) {
      const copy = updateStatus(currentGrid, correctGrid, selectedCell)
      setCurrentGrid(copy)
    }
  }, [shufflesLeft, selectedCell])

  return (
    <article>
      {currentGrid ? <Grid data={currentGrid} onClick={onClick} /> : <Loader />}
    </article>
  )
}
