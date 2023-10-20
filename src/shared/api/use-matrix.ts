import { useEffect, useState } from 'react'
import { CrosswordleType } from '../model/crosswordle'

export const useMatrix = (data?: CrosswordleType) => {
  const [current, setCurrent] = useState<string[][]>()
  const [correct, setCorrect] = useState<string[][]>()
  const [selected, setSelected] = useState<{ i: number; j: number }>({
    i: -1,
    j: -1,
  })

  useEffect(() => {
    if (data) {
      setCurrent(
        data.crossword.map((line) => [
          line[0] ? line[0][1] : '@',
          line[1] ? line[1][1] : '@',
          line[2] ? line[2][1] : '@',
          line[3] ? line[3][1] : '@',
          line[4] ? line[4][1] : '@',
          line[5] ? line[5][1] : '@',
          line[6] ? line[6][1] : '@',
        ]),
      )

      setCorrect(
        data.crossword.map((line) => [
          line[0] ? line[0][0] : '@',
          line[1] ? line[1][0] : '@',
          line[2] ? line[2][0] : '@',
          line[3] ? line[3][0] : '@',
          line[4] ? line[4][0] : '@',
          line[5] ? line[5][0] : '@',
          line[6] ? line[6][0] : '@',
        ]),
      )
    }
  }, [data])

  return { current, correct, setCurrent, selected, setSelected }
}
