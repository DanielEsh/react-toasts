import type { ReactNode } from 'react'
import { Button } from '@/shared/ui'
import { memo } from 'react'

interface Props {
  children: ReactNode
  onClick: () => void
}

const ListItemImpl = ({ children, onClick }: Props) => {
  return (
    <div>
      <span>{children}</span>

      <Button
        variant="ghost"
        onClick={onClick}
      >
        Click me
      </Button>
    </div>
  )
}

export const ListItem = memo(ListItemImpl)
