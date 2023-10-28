import { GridType, SelectedCell } from '../types/crosswordle'

export const swapCells = (
  current: GridType,
  toSwap: SelectedCell,
  fromSwap: SelectedCell,
) => {
  const copy = current[toSwap.i][toSwap.j]
  current[toSwap.i][toSwap.j] = current[fromSwap.i][fromSwap.j]

  current[fromSwap.i][fromSwap.j] = copy

  return current
}
