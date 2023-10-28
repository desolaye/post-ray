import {
  CELL_STATUS,
  CellType,
  GridType,
  SelectedCell,
} from '../types/crosswordle'

const updateCell = (
  correct: GridType,
  current: GridType,
  cell: CellType,
  i: number,
  j: number,
) => {
  if (cell.status === CELL_STATUS.CORRECT || cell.status === CELL_STATUS.EMPTY)
    return cell.status

  let lineCount = 0

  for (let k = j - 1; k >= 0; k--) {
    if (!correct[i][k].letter) break
    if (correct[i][k].letter === current[i][k].letter) continue

    if (current[i][k].letter === cell.letter) lineCount--
    if (correct[i][k].letter === cell.letter) lineCount++
  }

  if (lineCount < 0) return CELL_STATUS.WRONG
  if (lineCount > 0) return CELL_STATUS.NEARBY

  for (let k = j + 1; k < correct.length; k++) {
    if (!correct[i][k].letter) break
    if (correct[i][k].letter === current[i][k].letter) continue
    if (correct[i][k].letter === cell.letter) return CELL_STATUS.NEARBY
  }

  let columnCount = 0

  for (let k = i - 1; k >= 0; k--) {
    if (!correct[k][j].letter) break
    if (correct[k][j].letter === current[k][j].letter) continue

    if (current[k][j].letter === cell.letter) columnCount--
    if (correct[k][j].letter === cell.letter) columnCount++
  }

  if (columnCount < 0) return CELL_STATUS.WRONG
  if (columnCount > 0) return CELL_STATUS.NEARBY

  for (let k = i + 1; k < correct.length; k++) {
    if (!correct[k][j].letter) break
    if (correct[k][j].letter === current[k][j].letter) continue
    if (correct[k][j].letter === cell.letter) return CELL_STATUS.NEARBY
  }

  return CELL_STATUS.WRONG
}

export const updateGridStatus = (
  current: GridType,
  correct: GridType,
  selectedCell?: SelectedCell,
) => {
  const copy: GridType = current.map((line) => [...line])

  for (let i = 0; i < copy.length; i++) {
    for (let j = 0; j < copy.length; j++) {
      if (copy[i][j].letter && copy[i][j].letter === correct[i][j].letter) {
        copy[i][j] = {
          ...copy[i][j],
          status: CELL_STATUS.CORRECT,
        }
      }
    }
  }

  for (let i = 0; i < copy.length; i++) {
    for (let j = 0; j < copy.length; j++) {
      copy[i][j] = {
        ...copy[i][j],
        status: updateCell(correct, copy, copy[i][j], i, j),
      }
    }
  }

  if (selectedCell) {
    copy[selectedCell.i][selectedCell.j] = {
      ...copy[selectedCell.i][selectedCell.j],
      status: CELL_STATUS.SELECTED,
    }
  }

  return copy
}
