import { Link, Outlet } from 'react-router-dom'
import { AnimatedList } from '../components/list/AnimatedList.tsx'
import { AnimatedQueue } from '../components/animated-queue/AnimatedQueue.tsx'
import { TransitionExample } from '../components/transition/TransitionExample.tsx'

export default function CategoriesPage() {
  return (
    <div>
      <h1>Categories</h1>

      <AnimatedList />
      <AnimatedQueue />

      <TransitionExample />

      <div>
        <Link to="/">Back home</Link>
      </div>

      <Outlet />
    </div>
  )
}
