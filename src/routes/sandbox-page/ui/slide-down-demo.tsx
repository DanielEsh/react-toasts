import { useToggle } from '@/hooks/use-toggle.ts'
import { Button } from '@/shared/ui'
import { AnimatePresence } from 'framer-motion'
import { SlideDown } from '@/components/framer/slide-down.tsx'

export const SlideDownDemo = () => {
  const [isToggled, toggle] = useToggle(true)

  return (
    <div>
      <h2>Slide Down</h2>

      <Button onClick={toggle}>Toggle: {isToggled.toString()}</Button>

      <AnimatePresence>
        {isToggled && (
          <div className="h-[200px] w-[700px] overflow-hidden">
            <SlideDown className="flex h-[200px] w-[700px] items-center justify-center bg-[#ffd644]">
              FADE MOTION EXAMPLE
            </SlideDown>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
