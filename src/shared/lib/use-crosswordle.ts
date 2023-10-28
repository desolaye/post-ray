import { useEffect, useState } from 'react'
import { GridType, SelectedCell } from '../types/crosswordle'
import { BackendDataType } from '../types/backend-data'
import { convertToGrid } from './convert-to-grid'
import { updateGridStatus } from './update-grid-status'
import { swapCells } from './swap-cells'

export const useCrosswordle = () => {
  const [backendData, setBackendData] = useState<BackendDataType>()
  const [currentGrid, setCurrentGrid] = useState<GridType>()
  const [correctGrid, setCorrectGrid] = useState<GridType>()
  const [selectedCell, setSelectedCell] = useState<SelectedCell>()

  const [shufflesLeft, setShuffletsLeft] = useState(1)
  const [currentDay, setCurrentDay] = useState(0)

  const handleCellSelect = (i: number, j: number) => {
    if (selectedCell && selectedCell.i === i && selectedCell.j === j) {
      setSelectedCell(undefined)
    } else if (selectedCell && currentGrid) {
      swapCells(currentGrid, selectedCell, { i, j })
      setSelectedCell(undefined)
      setShuffletsLeft((prev) => prev - 1)
    }

    if (!selectedCell) setSelectedCell({ i, j })
  }

  useEffect(() => {
    if (backendData) {
      const { crossword, day, shuffles } = backendData
      const { currentGrid, correctGrid } = convertToGrid(crossword)
      const copy = updateGridStatus(currentGrid, correctGrid, selectedCell)

      setCorrectGrid(correctGrid)
      setCurrentGrid(currentGrid)
      setShuffletsLeft(shuffles)
      setCurrentDay(day)
      setCurrentGrid(copy)
    } else {
      setCorrectGrid(undefined)
      setCurrentGrid(undefined)
    }
  }, [backendData])

  useEffect(() => {
    if (currentGrid && correctGrid) {
      const copy = updateGridStatus(currentGrid, correctGrid, selectedCell)
      setCurrentGrid(copy)
    }
  }, [selectedCell])

  return {
    currentGrid,
    correctGrid,
    selectedCell,
    shufflesLeft,
    currentDay,
    handleCellSelect,
    setBackendData,
  }
}
