import { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../state/login.state.js"
function ProtectedRoute() {
  const loading = useAuthStore((store) => store.loading)
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated)
  const verifyToken = useAuthStore((state) => state.verifyLogin)
  useEffect(() => {
    verifyToken()
  }, [verifyToken])
  if (loading) {
    return <div>Loading......</div>
  }
  if (!loading && !isAuthenticated) {
    return <Navigate to='/' replace />
  }

  return (
    <Outlet />
  )
}

export default ProtectedRoute