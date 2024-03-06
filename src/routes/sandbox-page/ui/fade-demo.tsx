import { AnimatePresence } from 'framer-motion'
import { useToggle } from '@/hooks/use-toggle.ts'
import { Button } from '@/shared/ui'
import { FadeAnimation } from '@/components/framer/fade.tsx'

export const FadeDemo = () => {
  const [isToggled, toggle] = useToggle(true)

  return (
    <div>
      <h2>Fade</h2>

      <Button onClick={toggle}>Toggle: {isToggled.toString()}</Button>

      <AnimatePresence>
        {isToggled && (
          <FadeAnimation key="fade">
            <div className="flex h-[200px] w-[700px] items-center justify-center bg-[#ffd644]">
              FADE MOTION EXAMPLE
            </div>
          </FadeAnimation>
        )}
      </AnimatePresence>
    </div>
  )
}
