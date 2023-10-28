import { CELL_STATUS, GridType } from '../types/crosswordle'

export const getGameStatus = (current: GridType) => {
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
