import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routers/router'
import { CepContextProvider } from './context/CepContext'

import './index.css'

createRoot(document.getElementById('root')).render(
  <CepContextProvider>
    <RouterProvider router={router} />
  </CepContextProvider>
)
