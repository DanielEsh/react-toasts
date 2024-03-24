import { useToggle } from '@/shared/hooks/use-toggle.ts'
import { Button } from '@/shared/ui'
import { AnimatePresence } from 'framer-motion'
import { SlideDownTransition } from '@/shared/ui'

export const SlideDownDemo = () => {
  const [isToggled, toggle] = useToggle(true)

  return (
    <div>
      <h2>Slide Down</h2>

      <Button onClick={toggle}>Toggle: {isToggled.toString()}</Button>

      <AnimatePresence>
        {isToggled && (
          <div className="h-[200px] w-[700px] overflow-hidden">
            <SlideDownTransition className="flex h-[200px] w-[700px] items-center justify-center bg-[#ffd644]">
              SLIDE DOWN MOTION EXAMPLE
            </SlideDownTransition>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
