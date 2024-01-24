import { Link, Outlet } from 'react-router-dom'
import { AnimatedList } from '../components/list/AnimatedList.tsx'
import { AnimatedQueue } from '../components/animated-queue/AnimatedQueue.tsx'

export default function CategoriesPage() {
  return (
    <div>
      <h1>Categories</h1>

      <AnimatedList />
      <AnimatedQueue />

      <div>
        <Link to="/">Back home</Link>
      </div>

      <Outlet />
    </div>
  )
}
