import { AnimatePresence } from 'framer-motion'
import { useToggle } from '@/hooks/use-toggle.ts'
import { Button } from '@/shared/ui'
import { SlideLeft } from '@/components/framer/slide-left.tsx'

export const SlideLeftDemo = () => {
  const [isToggled, toggle] = useToggle(true)

  return (
    <div>
      <h2>Slide Left</h2>

      <Button onClick={toggle}>Toggle: {isToggled.toString()}</Button>

      <AnimatePresence>
        {isToggled && (
          <div className="h-[200px] w-[700px] overflow-hidden">
            <SlideLeft className="flex h-[200px] w-[700px] items-center justify-center bg-[#ffd644]">
              FADE MOTION EXAMPLE
            </SlideLeft>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
