import { AnimatePresence } from 'framer-motion'

import { useToggle } from '@/shared/hooks/use-toggle.ts'
import { Button } from '@/shared/ui'
import { ScaleDownTransition } from '@/shared/ui'

export const ScaleDownDemo = () => {
  const [isToggled, toggle] = useToggle(true)

  return (
    <div>
      <h2>Scale Down</h2>

      <Button onClick={toggle}>Toggle: {isToggled.toString()}</Button>

      <AnimatePresence>
        {isToggled && (
          <div className="h-[200px] w-[700px] overflow-hidden">
            <ScaleDownTransition className="flex h-[200px] w-[700px] items-center justify-center bg-[#ffd644]">
              SCALE DOWN MOTION EXAMPLE
            </ScaleDownTransition>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
