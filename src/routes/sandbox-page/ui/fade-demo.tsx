import { useToggle } from '@/hooks/use-toggle.ts'
import { Button } from '@/shared/ui'
import { Transition } from '@/shared/ui'

export const FadeDemo = () => {
  const [isToggled, toggle] = useToggle(true)

  return (
    <div>
      <h2>Fade</h2>

      <Button onClick={toggle}>Toggle: {isToggled.toString()}</Button>

      <Transition
        in={isToggled}
        variant="fade"
        keepMounted
        initial={false}
      >
        <div className="flex h-[200px] w-[700px] items-center justify-center bg-[#ffd644]">
          FADE MOTION EXAMPLE
        </div>
      </Transition>
    </div>
  )
}
