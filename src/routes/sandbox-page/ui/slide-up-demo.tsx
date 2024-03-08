import { useToggle } from '@/hooks/use-toggle.ts'
import { Button } from '@/shared/ui'
import { AnimatePresence } from 'framer-motion'
import { SlideUp } from '@/components/framer/slide-up.tsx'

export const SlideUpDemo = () => {
  const [isToggled, toggle] = useToggle(true)

  return (
    <div>
      <h2>Slide Up</h2>

      <Button onClick={toggle}>Toggle: {isToggled.toString()}</Button>

      <AnimatePresence>
        {isToggled && (
          <div className="h-[200px] w-[700px] overflow-hidden">
            <SlideUp className="flex h-[200px] w-[700px] items-center justify-center bg-[#ffd644]">
              FADE MOTION EXAMPLE
            </SlideUp>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
