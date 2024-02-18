import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

const COMPONENT_NAME = 'DropdownContent'

export const DropdownContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>((props, forwardedRef) => {
  const { children, ...restProps } = props

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={forwardedRef}
        side="bottom"
        align="end"
        sideOffset={8}
        className="dropdown-content min-w-[8rem] overflow-hidden rounded-md border bg-white shadow-md"
        {...restProps}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  )
})

DropdownContent.displayName = COMPONENT_NAME
