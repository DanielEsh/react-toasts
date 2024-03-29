import type { ReactNode } from 'react'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

import { DropdownContent } from './dropdown-content.tsx'
import { DropdownItem } from './dropdown-item.tsx'
import { DropdownTrigger } from './dropdown-trigger.tsx'

type Props = {
  children: ReactNode
}

export const Dropdown = (props: Props) => {
  const { children } = props

  return <DropdownMenuPrimitive.Root>{children}</DropdownMenuPrimitive.Root>
}

Dropdown.Trigger = DropdownTrigger
Dropdown.Content = DropdownContent
Dropdown.Item = DropdownItem
