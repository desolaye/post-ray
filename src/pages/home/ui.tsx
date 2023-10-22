import { useEffect, useState } from 'react'

import { CrosswordleType } from '@/shared/model/crosswordle'

import { Row } from '@/shared/ui/Row'
import { Header } from '@/shared/ui/Header'
import { NavBar } from '@/shared/ui/NavBar'

import { useMatrix } from '@/shared/api/use-matrix'
import { getDaily } from '@/shared/api/get-daily'

export const Home = () => {
  const [matrix, setMatrix] = useState<CrosswordleType>()
  const {
    correct,
    current,
    selected,
    shufflesLeft,
    setShufflesLeft,
    setSelected,
    setCurrent,
    isDone,
  } = useMatrix(matrix)

  const handleSwap = (i: number, j: number) => {
    if (i === selected.i && j === selected.j) {
      setSelected({ i: -1, j: -1 })
    } else if (selected.i >= 0 && selected.j >= 0) {
      const crt = JSON.stringify(current)
      const parsed = JSON.parse(crt)
      const toSwap = parsed[i][j]

      parsed[i][j] = parsed[selected.i][selected.j]
      parsed[selected.i][selected.j] = toSwap

      setCurrent(parsed)
      setShufflesLeft((prev) => prev - 1)
      setSelected({ i: -1, j: -1 })
    } else {
      setSelected({ i, j })
    }
  }

  useEffect(() => {
    getDaily().then((data) => {
      setMatrix(data)
      setShufflesLeft(data?.shuffles || 19)
    })
  }, [])

  return (
    <>
      {isDone !== 'playing' && (
        <article className="absolute top-0 min-h-screen bg-slate-100 w-full bg-opacity-50 flex justify-center items-center">
          <section className="bg-lime-100 p-2 rounded shadow flex flex-col gap-4">
            <header className="text-center text-2xl">
              {isDone === 'win' && 'Победа'}
              {isDone === 'lose' && 'Поражение...'}
            </header>
            <main>
              {isDone === 'win' && <>Осталось замен: {shufflesLeft}</>}
            </main>
          </section>
        </article>
      )}

      <article className="flex flex-col gap-4 bg-slate-50 min-h-screen">
        <Header />
        <NavBar />
        <div className="bg-lime-100 w-fit mx-auto p-4 rounded shadow flex flex-col gap-0.5">
          {!(current && correct) && (
            <p className="text-center text-lg">Загружаем...</p>
          )}
          {current &&
            correct &&
            current.map((line, i) => (
              <Row
                onSelect={handleSwap}
                selected={selected}
                key={i}
                correct={correct}
                current={current}
                line={line}
                i={i}
              />
            ))}
        </div>
        <p className="text-lg text-center">Осталось {shufflesLeft} замен</p>
      </article>
    </>
  )
}
