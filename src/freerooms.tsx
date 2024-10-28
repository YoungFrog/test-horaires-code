import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import FreeRooms from './components/FreeRooms'
;(async () => {
  const container = document.getElementById('root')
  createRoot(container!).render(
    <StrictMode>
      <FreeRooms />
    </StrictMode>
  )
})()
