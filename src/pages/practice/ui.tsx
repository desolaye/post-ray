import { useEffect, useState } from 'react'

import { CrosswordleType } from '@/shared/model/crosswordle'

import { Row } from '@/shared/ui/Row'
import { Header } from '@/shared/ui/Header'
import { NavBar } from '@/shared/ui/NavBar'

import { useMatrix } from '@/shared/api/use-matrix'
import { getPractice } from '@/shared/api/get-practice'

export const Practice = () => {
  const [matrix, setMatrix] = useState<CrosswordleType>()
  const { correct, current } = useMatrix(matrix)

  useEffect(() => {
    getPractice().then((data) => setMatrix(data))
  }, [])

  return (
    <article className="flex flex-col gap-4">
      <Header />
      <NavBar />
      <div className="bg-lime-100 w-fit mx-auto p-4 rounded shadow">
        {!(current && correct) && (
          <p className="text-center text-lg">Загружаем...</p>
        )}

        {current &&
          correct &&
          current.map((line, i) => (
            <Row
              key={i}
              correct={correct}
              current={current}
              line={line}
              i={i}
            />
          ))}
      </div>
      <p className="text-lg text-center">Осталось Х замен</p>
    </article>
  )
}
