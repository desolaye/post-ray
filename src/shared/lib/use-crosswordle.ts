import { useEffect, useState } from 'react'
import {
  GAME_STATUS,
  GridType,
  SavedCrosswordle,
  SelectedCell,
} from '../types/crosswordle'
import { BackendDataType } from '../types/backend-data'
import { convertToGrid } from './convert-to-grid'
import { updateGridStatus } from './update-grid-status'
import { swapCells } from './swap-cells'
import { getGameStatus } from './get-game-status'

export const useCrosswordle = () => {
  const [backendData, setBackendData] = useState<BackendDataType>()
  const [currentGrid, setCurrentGrid] = useState<GridType>()
  const [correctGrid, setCorrectGrid] = useState<GridType>()
  const [selectedCell, setSelectedCell] = useState<SelectedCell>()
  const [gameStatus, setGameStatus] = useState<GAME_STATUS>(GAME_STATUS.IN_GAME)

  const [shufflesLeft, setShuffletsLeft] = useState(1)
  const [currentDay, setCurrentDay] = useState(-1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPractice, setIsPractice] = useState(false)

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

  const handleSavedData = (data: SavedCrosswordle) => {
    if (currentDay !== data.day) {
      saveLocalData(data.streak)
    } else {
      setCurrentGrid(data.crossword)
      setShuffletsLeft(data.shufflesLeft)
      setGameStatus(data.gameStatus)
    }
  }

  const saveLocalData = (streak: number, status?: GAME_STATUS) => {
    if (currentGrid) {
      const data: SavedCrosswordle = {
        crossword: currentGrid,
        day: currentDay,
        shufflesLeft,
        gameStatus: status ? status : gameStatus,
        streak,
      }

      localStorage.setItem('ru-crossword', JSON.stringify(data))
    }
  }

  useEffect(() => {
    if (backendData) {
      const { crossword, day, shuffles } = backendData
      const { currentGrid, correctGrid } = convertToGrid(crossword)
      const copy = updateGridStatus(currentGrid, correctGrid, selectedCell)

      setGameStatus(GAME_STATUS.IN_GAME)
      setCorrectGrid(correctGrid)
      setCurrentGrid(copy)
      setShuffletsLeft(shuffles)
      setCurrentDay(day)
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

  useEffect(() => {
    const localData = localStorage.getItem('ru-crossword')

    if (currentGrid && localData) {
      const data: SavedCrosswordle = JSON.parse(localData)
      const status = getGameStatus(currentGrid)

      if (status) {
        setGameStatus(GAME_STATUS.WIN)
        setIsModalOpen(true)

        if (data.gameStatus === GAME_STATUS.IN_GAME) {
          if (!isPractice) saveLocalData(data.streak + 1, GAME_STATUS.WIN)
        } else {
          if (!isPractice) saveLocalData(data.streak, GAME_STATUS.WIN)
        }
      }

      if (!status && shufflesLeft < 1) {
        setGameStatus(GAME_STATUS.LOSE)
        setIsModalOpen(true)
        if (!isPractice) saveLocalData(0, GAME_STATUS.LOSE)
      }
    }

    if (!localData) saveLocalData(0)
  }, [currentGrid])

  return {
    currentGrid,
    correctGrid,
    selectedCell,
    shufflesLeft,
    gameStatus,
    isModalOpen,
    handleCellSelect,
    setBackendData,
    setIsModalOpen,
    handleSavedData,
    saveLocalData,
    setIsPractice,
  }
}
