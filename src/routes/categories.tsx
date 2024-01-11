import { Link, Outlet } from 'react-router-dom'

export default function CategoriesPage() {
  return (
    <div>
      <h1>Categories</h1>
      <div>
        <Link to="/">Back home</Link>
      </div>

      <Outlet />
    </div>
  )
}
