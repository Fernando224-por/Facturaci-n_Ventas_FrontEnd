import { useAuthStore } from "../state/login.state.js"
function Dashboard() {
  const logOut = useAuthStore((state) => state.logoutUser)
  return (
    <div>
      <p>Dashboard</p>
      <button onClick={logOut}>cerrar Sesion</button>
    </div>

  )
}

export default Dashboard