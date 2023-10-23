import { CELL_STATUS, Grid } from '../types/crosswordle'

export const getGameStatus = (current: Grid) => {
  let done = true

  for (let i = 0; i < current.length && done; i++) {
    for (let j = 0; j < current.length && done; j++) {
      const status = current[i][j].status

      if (!(status === CELL_STATUS.CORRECT || status === CELL_STATUS.EMPTY)) {
        done = false
      }
    }
  }

  return done
}
