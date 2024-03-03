import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { DropdownTrigger } from './dropdown-trigger'
import { DropdownContent } from './dropdown-content'
import { DropdownItem } from './dropdown-item'
import type { ReactNode } from 'react'

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
