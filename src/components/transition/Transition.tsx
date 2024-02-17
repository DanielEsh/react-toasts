import { ReactNode, useEffect, useState } from 'react'
import { useTransition } from './use-transition.ts'
import { useDidUpdate } from '../../hooks/use-did-update.ts'

interface Props {
  children: ReactNode
  /** Called when exit transition ends */
  onExited?: () => void

  /** Called when exit transition starts */
  onExit?: () => void

  /** Called when enter transition starts */
  onEnter?: () => void

  /** Called when enter transition ends */
  onEntered?: () => void
}

export const Transition = ({ children }: Props) => {
  const {
    state: { status: state },
    toggle,
  } = useTransition({
    initialEntered: true,
    timeout: 500,
  })

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // toggle()
  }, [])

  return (
    <>
      <button
        className="button"
        onClick={() => toggle()}
      >
        Toggle
      </button>
      <div className={`fade-transition ${state}`}>{children}</div>
    </>
  )
}
