import Header from './Header'
import { Outlet } from 'react-router'
function App() {
  return (
    <>
      <Header />
      <div className="p-4">
        <Outlet />
      </div>
    </>
  )
}

export default App
