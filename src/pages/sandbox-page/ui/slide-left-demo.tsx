import { AnimatePresence } from 'framer-motion'

import { useToggle } from '@/shared/hooks/use-toggle.ts'
import { Button, SlideLeftTransition } from '@/shared/ui'

export const SlideLeftDemo = () => {
  const [isToggled, toggle] = useToggle(true)

  return (
    <div>
      <h2>Slide Left</h2>

      <Button onClick={toggle}>Toggle: {isToggled.toString()}</Button>

      <AnimatePresence>
        {isToggled && (
          <div className="h-[200px] w-[700px] overflow-hidden">
            <SlideLeftTransition className="flex h-[200px] w-[700px] items-center justify-center bg-[#ffd644]">
              SLIDE LEFT MOTION EXAMPLE
            </SlideLeftTransition>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
