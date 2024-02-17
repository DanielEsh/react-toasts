import { Link, Outlet } from 'react-router-dom'
import { AnimatedList } from '../components/list/AnimatedList.tsx'
import { AnimatedQueue } from '../components/animated-queue/AnimatedQueue.tsx'
import { TransitionExample } from '../components/transition/TransitionExample.tsx'
import { Transition } from '../components/transition/Transition.tsx'

export default function CategoriesPage() {
  return (
    <div>
      <h1>Categories</h1>

      <AnimatedList />
      <AnimatedQueue />

      <TransitionExample />

      <Transition>
        <div className="bg-amber-300 w-[700px] h-[200px] flex items-center justify-center">
          FADE TRANSITION EXAMPLE
        </div>
      </Transition>

      <div>
        <Link to="/">Back home</Link>
      </div>

      <Outlet />
    </div>
  )
}
