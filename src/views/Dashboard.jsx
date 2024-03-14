import { useAuthStore } from "../state/login.state.js"
import Navbar from '../components/NavBar.jsx'

function Dashboard() {
  const logOut = useAuthStore((state) => state.logoutUser)
  return (
    <div>
      <Navbar/>
      <p>Dashboard</p>
    </div>

  )
}

export default Dashboard