import { CELL_STATUS, GridType } from '../types/crosswordle'

export const getClipboardValue = (
  current: GridType,
  shufflesLeft: number,
  day: number,
) => {
  const icon = shufflesLeft > 0 ? '✅' : '❌'
  let data = '=== Crosswordle ===\n'

  data += `#day${day} RU - ${icon} (${shufflesLeft}⭐)\n`

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
