import { useToggle } from '@/hooks/use-toggle.ts'
import { Button } from '@/shared/ui'
import { Transition } from '@/shared/ui'

export const ScaleDemo = () => {
  const [isToggled, toggle] = useToggle(true)

  return (
    <div>
      <h2>Scale</h2>

      <Button onClick={toggle}>Toggle: {isToggled.toString()}</Button>

      <Transition
        in={isToggled}
        variant="scale"
        className="flex h-[200px] w-[700px] items-center justify-center bg-[#ffd644]"
      >
        <div>SCALE MOTION EXAMPLE</div>
      </Transition>
    </div>
  )
}
