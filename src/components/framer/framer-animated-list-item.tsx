import { ReactNode } from 'react'
import { FadeAnimation } from './fade.tsx'

interface Props {
  children: ReactNode
  onDelete: () => void
}

export const FramerAnimatedListItem = ({ children, onDelete }: Props) => {
  return (
    <FadeAnimation>
      <li className="bg-amber-300 p-4 border border-amber-400">
        {children}
        <button onClick={onDelete}>Удалить</button>
      </li>
    </FadeAnimation>
  )
}
