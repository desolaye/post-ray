import { lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

const Home = lazy(() => import('./home'))
const Practice = lazy(() => import('./practice'))

export const Routing = () => {
  return (
    <Routes>
      <Route path="/daily" element={<Home />} />
      <Route path="/practice" element={<Practice />} />
      <Route path="*" element={<Navigate to="/daily" />} />
    </Routes>
  )
}
