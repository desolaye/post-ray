import { lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

const Game = lazy(() => import('./game'))

export const Routing = () => {
  return (
    <Routes>
      <Route path="/daily" element={<Game />} />
      <Route path="/practice" element={<Game />} />
      <Route path="*" element={<Navigate to="/daily" />} />
    </Routes>
  )
}
