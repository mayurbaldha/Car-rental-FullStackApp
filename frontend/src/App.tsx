import './App.css'
import { CarSearch } from './components/CarSearch'
import UserDashboard from './components/UserDashboard'

function App() {

  return (
    <>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <CarSearch />
        </div>
        <div style={{ flex: 1 }}>
          <UserDashboard />
        </div>
      </div>
    </>
  )
}

export default App
