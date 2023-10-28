import { CELL_STATUS, SavedCrosswordle } from '../types/crosswordle'

export const getClipboardValue = () => {
  const localData = localStorage.getItem('ru-crossword')!
  const crossword: SavedCrosswordle = JSON.parse(localData)

  const icon = crossword.shufflesLeft > 0 ? '✅' : '❌'
  let data = '=== Crosswordle ===\n'

  data += `#day${crossword.day} RU - ${icon} (${crossword.shufflesLeft}⭐)\n`
  data += `Streak: ${crossword.streak}🔥\n`

  for (let i = 0; i < crossword.crossword.length; i++) {
    for (let j = 0; j < crossword.crossword[i].length; j++) {
      if (crossword.crossword[i][j].status === CELL_STATUS.CORRECT) data += '🟩'
      if (crossword.crossword[i][j].status === CELL_STATUS.NEARBY) data += '🟨'
      if (crossword.crossword[i][j].status === CELL_STATUS.WRONG) data += '🟥'
      if (crossword.crossword[i][j].status === CELL_STATUS.EMPTY) data += '⬛️'
    }
    data += '\n'
  }

  data += `\nhttps://post-ray.vercel.app/\n`

  return data
}
