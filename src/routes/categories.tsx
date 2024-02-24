import { Link, Outlet } from 'react-router-dom'
import { AnimatedList } from '../components/list/AnimatedList.tsx'
import { AnimatedQueue } from '../components/animated-queue/AnimatedQueue.tsx'
import { TransitionExample } from '../components/transition/TransitionExample.tsx'
import { Transition } from '../components/transition/Transition.tsx'
import { DropdownDemo } from '../components/DropdownDemo.tsx'
import { FadeAnimation } from '../components/framer/fade.tsx'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { FramerAnimatedList } from '../components/framer/framer-animated-list.tsx'

export default function CategoriesPage() {
  const [fade, setFade] = useState(false)

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
      <DropdownDemo />

      <button
        className="button"
        onClick={() => setFade(!fade)}
      >
        frame motion example
      </button>

      <AnimatePresence>
        {fade && (
          <FadeAnimation key="fade">
            <div className="bg-amber-300 w-[700px] h-[200px] flex items-center justify-center">
              FADE MOTION EXAMPLE
            </div>
          </FadeAnimation>
        )}
      </AnimatePresence>

      <FramerAnimatedList />

      <div>
        <Link to="/">Back home</Link>
      </div>
      <div className="h-[2000px]"></div>
      <Outlet />
    </div>
  )
}
