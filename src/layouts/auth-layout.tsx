import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div>
      Auth Layout
      <div className="page">
        <Outlet />
      </div>
    </div>
  )
}
