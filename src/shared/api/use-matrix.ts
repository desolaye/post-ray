import { useEffect, useState } from 'react'
import { CrosswordleType } from '../model/crosswordle'

export const useMatrix = (data?: CrosswordleType) => {
  const [current, setCurrent] = useState<string[][]>()
  const [correct, setCorrect] = useState<string[][]>()
  const [shufflesLeft, setShufflesLeft] = useState(1)
  const [isDone, setIsDone] = useState<'playing' | 'win' | 'lose'>('playing')
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

  useEffect(() => {
    if (current && correct) {
      let done = true
      for (let i = 0; i < current.length && done; i++) {
        for (let j = 0; j < correct.length && done; j++) {
          if (current[i][j] !== correct[i][j]) done = false
        }
      }
      if (done) setIsDone('win')
      else if (shufflesLeft < 1) setIsDone('lose')
    }
  }, [current, shufflesLeft, correct])

  return {
    current,
    correct,
    setCurrent,
    selected,
    setSelected,
    shufflesLeft,
    setShufflesLeft,
    isDone,
  }
}
