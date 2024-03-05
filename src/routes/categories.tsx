import { Link, Outlet } from 'react-router-dom'
import { AnimatedList } from '../components/list/AnimatedList.tsx'
import { AnimatedQueue } from '../components/animated-queue/AnimatedQueue.tsx'
import { DropdownDemo } from '../components/DropdownDemo.tsx'
import { FadeAnimation } from '../components/framer/fade.tsx'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { FramerAnimatedList } from '../components/framer/framer-animated-list.tsx'
import { FadeTransition } from '@/shared/ui/transition/fade.tsx'
import { Button } from '@/shared/ui'

export default function CategoriesPage() {
  const [fade, setFade] = useState(false)

  return (
    <div>
      <h1>Categories</h1>
      <AnimatedList />
      <AnimatedQueue />
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
            <div className="flex h-[200px] w-[700px] items-center justify-center bg-amber-300">
              FADE MOTION EXAMPLE
            </div>
          </FadeAnimation>
        )}
      </AnimatePresence>

      <FramerAnimatedList />

      <h2>Transitions</h2>

      <div>fade</div>
      <div>scale</div>

      <Button onClick={() => setFade(!fade)}>Fade example</Button>

      <AnimatePresence>
        {fade && (
          <FadeTransition>
            <div className="flex h-[200px] w-[700px] items-center justify-center bg-amber-300">
              FADE MOTION EXAMPLE
            </div>
          </FadeTransition>
        )}
      </AnimatePresence>

      <div>
        <Link to="/">Back home</Link>
      </div>
      <div className="h-[2000px]"></div>
      <Outlet />
    </div>
  )
}
