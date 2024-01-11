import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <div>
      RootLayout
      <div className="">
        <Outlet />
      </div>
    </div>
  )
}
