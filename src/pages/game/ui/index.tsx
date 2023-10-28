import { useEffect } from 'react'

import { getDaily } from '@/shared/api/get-daily'
import { useCrosswordle } from '@/shared/lib/use-crosswordle'
import { Header } from '@/shared/ui/header'

import { Main } from './main'

export const Game = () => {
  const { currentGrid, handleCellSelect, shufflesLeft, setBackendData } =
    useCrosswordle()

  useEffect(() => {
    getDaily().then((data) => setBackendData(data))
  }, [])

  return (
    <article>
      <Header />
      {currentGrid && (
        <Main
          currentGrid={currentGrid}
          shufflesLeft={shufflesLeft}
          onCellSelect={handleCellSelect}
        />
      )}
    </article>
  )
}
