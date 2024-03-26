import { AnimatePresence } from 'framer-motion'

import { useToggle } from '@/shared/hooks/use-toggle.ts'
import { Button } from '@/shared/ui'
import { SlideUpTransition } from '@/shared/ui'

export const SlideUpDemo = () => {
  const [isToggled, toggle] = useToggle(true)

  return (
    <div>
      <h2>Slide Up</h2>

      <Button onClick={toggle}>Toggle: {isToggled.toString()}</Button>

      <AnimatePresence>
        {isToggled && (
          <div className="h-[200px] w-[700px] overflow-hidden">
            <SlideUpTransition className="flex h-[200px] w-[700px] items-center justify-center bg-[#ffd644]">
              SLIDE UP MOTION EXAMPLE
            </SlideUpTransition>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
