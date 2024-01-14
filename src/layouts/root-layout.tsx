import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <div>
      RootLayout
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  )
}
