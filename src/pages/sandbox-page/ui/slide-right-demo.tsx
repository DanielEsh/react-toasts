import { AnimatePresence } from 'framer-motion'

import { useToggle } from '@/shared/hooks/use-toggle.ts'
import { Button } from '@/shared/ui'
import { SlideRightTransition } from '@/shared/ui'

export const SlideRightDemo = () => {
  const [isToggled, toggle] = useToggle(true)

  return (
    <div>
      <h2>Slide Right</h2>

      <Button onClick={toggle}>Toggle: {isToggled.toString()}</Button>

      <AnimatePresence>
        {isToggled && (
          <div className="h-[200px] w-[700px] overflow-hidden">
            <SlideRightTransition className="flex h-[200px] w-[700px] items-center justify-center bg-[#ffd644]">
              SLIDE RIGHT MOTION EXAMPLE
            </SlideRightTransition>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
