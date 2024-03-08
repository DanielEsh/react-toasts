import { AnimatePresence } from 'framer-motion'
import { useToggle } from '@/hooks/use-toggle.ts'
import { Button } from '@/shared/ui'
import { SlideRight } from '@/components/framer/slide-right.tsx'

export const SlideRightDemo = () => {
  const [isToggled, toggle] = useToggle(true)

  return (
    <div>
      <h2>Slide Right</h2>

      <Button onClick={toggle}>Toggle: {isToggled.toString()}</Button>

      <AnimatePresence>
        {isToggled && (
          <div className="h-[200px] w-[700px] overflow-hidden">
            <SlideRight className="flex h-[200px] w-[700px] items-center justify-center bg-[#ffd644]">
              FADE MOTION EXAMPLE
            </SlideRight>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
