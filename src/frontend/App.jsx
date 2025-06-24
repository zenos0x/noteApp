import Notes from '../screens/Notes'
import '../styles/App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {path:"/", element: <Notes/>},
  ])

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
