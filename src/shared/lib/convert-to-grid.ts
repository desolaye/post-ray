import { BackendCrosswordleType } from '../types/backend-data'
import { CELL_STATUS, Grid } from '../types/crosswordle'

export const convertToGrid = ({ crossword }: BackendCrosswordleType) => {
  const currentGrid: Grid = crossword.map((line) => [
    line[0]
      ? { status: CELL_STATUS.WRONG, letter: line[0][1] }
      : { status: CELL_STATUS.EMPTY, letter: '' },
    line[1]
      ? { status: CELL_STATUS.WRONG, letter: line[1][1] }
      : { status: CELL_STATUS.EMPTY, letter: '' },
    line[2]
      ? { status: CELL_STATUS.WRONG, letter: line[2][1] }
      : { status: CELL_STATUS.EMPTY, letter: '' },
    line[3]
      ? { status: CELL_STATUS.WRONG, letter: line[3][1] }
      : { status: CELL_STATUS.EMPTY, letter: '' },
    line[4]
      ? { status: CELL_STATUS.WRONG, letter: line[4][1] }
      : { status: CELL_STATUS.EMPTY, letter: '' },
    line[5]
      ? { status: CELL_STATUS.WRONG, letter: line[5][1] }
      : { status: CELL_STATUS.EMPTY, letter: '' },
    line[6]
      ? { status: CELL_STATUS.WRONG, letter: line[6][1] }
      : { status: CELL_STATUS.EMPTY, letter: '' },
  ])

  const correctGrid: Grid = crossword.map((line) => [
    line[0]
      ? { status: CELL_STATUS.CORRECT, letter: line[0][0] }
      : { status: CELL_STATUS.EMPTY, letter: '' },
    line[1]
      ? { status: CELL_STATUS.CORRECT, letter: line[1][0] }
      : { status: CELL_STATUS.EMPTY, letter: '' },
    line[2]
      ? { status: CELL_STATUS.CORRECT, letter: line[2][0] }
      : { status: CELL_STATUS.EMPTY, letter: '' },
    line[3]
      ? { status: CELL_STATUS.CORRECT, letter: line[3][0] }
      : { status: CELL_STATUS.EMPTY, letter: '' },
    line[4]
      ? { status: CELL_STATUS.CORRECT, letter: line[4][0] }
      : { status: CELL_STATUS.EMPTY, letter: '' },
    line[5]
      ? { status: CELL_STATUS.CORRECT, letter: line[5][0] }
      : { status: CELL_STATUS.EMPTY, letter: '' },
    line[6]
      ? { status: CELL_STATUS.CORRECT, letter: line[6][0] }
      : { status: CELL_STATUS.EMPTY, letter: '' },
  ])

  return { currentGrid, correctGrid }
}
