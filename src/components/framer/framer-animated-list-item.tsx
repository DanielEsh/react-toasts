import type { ReactNode } from 'react'
import { SlideDown } from './slide-down.tsx'

interface Props {
  children: ReactNode
  onDelete: () => void
}

export const FramerAnimatedListItem = ({ children, onDelete }: Props) => {
  return (
    <SlideDown>
      <li className="border border-amber-400 bg-amber-300 p-4">
        {children}
        <button onClick={onDelete}>Удалить</button>
      </li>
    </SlideDown>
  )
}
