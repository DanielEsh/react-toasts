import { Link, Outlet } from 'react-router-dom'
import { AnimatedList } from '../components/list/AnimatedList.tsx'

export default function CategoriesPage() {
  return (
    <div>
      <h1>Categories</h1>

      <AnimatedList />

      <div>
        <Link to="/">Back home</Link>
      </div>

      <Outlet />
    </div>
  )
}
