import { AnimatePresence } from 'framer-motion'
import { useToggle } from '@/hooks/use-toggle.ts'
import { Button } from '@/shared/ui'
import { ScaleDownAnimation } from '@/components/framer/scale-down.tsx'

export const ScaleDownDemo = () => {
  const [isToggled, toggle] = useToggle(true)

  return (
    <div>
      <h2>Scale Down</h2>

      <Button onClick={toggle}>Toggle: {isToggled.toString()}</Button>

      <AnimatePresence>
        {isToggled && (
          <div className="h-[200px] w-[700px] overflow-hidden">
            <ScaleDownAnimation className="flex h-[200px] w-[700px] items-center justify-center bg-[#ffd644]">
              FADE MOTION EXAMPLE
            </ScaleDownAnimation>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
