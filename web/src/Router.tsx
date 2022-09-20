import { Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { Game } from './pages/Game'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/:id" element={<Game />} />
    </Routes>
  )
}