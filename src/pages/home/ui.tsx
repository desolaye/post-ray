import { useEffect, useState } from 'react'

import { Cell } from '@/shared/ui/Cell'
import { CrosswordleType } from '@/shared/model/crosswordle'

import { getPractice } from '@/shared/api/get-practice'
import { getDaily } from '@/shared/api/get-daily'

const useMatrix = (data?: CrosswordleType) => {
  const [current, setCurrent] = useState<string[][]>()
  const [correct, setCorrect] = useState<string[][]>()

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

  return { current, correct }
}

export const Home = () => {
  const [matrix, setMatrix] = useState<CrosswordleType>()
  const { correct, current } = useMatrix(matrix)

  const onClick = () => {
    getPractice().then((data) => setMatrix(data))
  }

  const getStatus = (
    correct: string[][],
    current: string[][],
    currentSymbol: string,
    i: number,
    j: number,
  ) => {
    if (currentSymbol === '@') return 'empty'
    if (correct[i][j] === currentSymbol) return 'correct'

    let lineCount = 0

    for (let k = j; k >= 0; k--) {
      if (correct[i][k] === '@') {
        lineCount = 0
        break
      }

      if (current[i][k] === currentSymbol) lineCount--
      if (correct[i][k] === currentSymbol) lineCount++
    }

    for (let k = j; k < j; k++) {
      if (correct[i][k] === '@') {
        lineCount = 0
        break
      }

      if (current[i][k] === currentSymbol) lineCount--
      if (correct[i][k] === currentSymbol) lineCount++
    }

    if (lineCount > 0) return 'nearby'

    let columnCount = 0

    for (let k = i; k < i; k++) {
      if (correct[k][j] === '@') {
        lineCount = 0
        break
      }

      if (current[i][k] === currentSymbol) columnCount--
      if (correct[i][k] === currentSymbol) columnCount++
    }

    for (let k = i; k >= 0; k--) {
      if (correct[k][j] === '@') {
        lineCount = 0
        break
      }

      if (current[i][k] === currentSymbol) columnCount--
      if (correct[i][k] === currentSymbol) columnCount++
    }

    if (columnCount > 0) return 'nearby'

    return 'wrong'
  }

  const printLine = (line: string[], i: number) => {
    return (
      <>
        <div className="flex">
          {line.map((cell, j) => (
            <Cell
              cell={cell}
              status={getStatus(correct, current, cell, i, j)}
            />
          ))}
        </div>
      </>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <button onClick={onClick}>Get Crosswordle</button>
      <div>
        {current &&
          current.map((line, i) => (
            <div key={i} className="flex">
              {printLine(line, i)}
            </div>
          ))}
      </div>
      <div>
        {correct &&
          correct.map((line, i) => (
            <div key={i} className="flex gap-2">
              {printLine(line, i)}
            </div>
          ))}
      </div>
    </div>
  )
}
