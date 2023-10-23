import { CELL_STATUS, Grid } from '../types/crosswordle'

export const getClipboardValue = (current: Grid, shufflesLeft: number) => {
  let data = 'Crosswordle RU\n'
  data += new Array(shufflesLeft).fill(0).reduce((prev) => prev + '⭐', '\n')
  data += shufflesLeft ? '\n\n' : ''

  for (let i = 0; i < current.length; i++) {
    for (let j = 0; j < current[i].length; j++) {
      if (current[i][j].status === CELL_STATUS.CORRECT) data += '🟩'
      if (current[i][j].status === CELL_STATUS.NEARBY) data += '🟨'
      if (current[i][j].status === CELL_STATUS.WRONG) data += '🟥'
      if (current[i][j].status === CELL_STATUS.EMPTY) data += '⬛️'
    }
    data += '\n'
  }

  data += `\nhttps://post-ray.vercel.app/\n`

  return data
}
