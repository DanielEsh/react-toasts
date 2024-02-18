import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

const COMPONENT_NAME = 'DropdownTrigger'

export const DropdownTrigger = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>((props, forwardedRef) => {
  const { children, ...restProps } = props

  return (
    <DropdownMenuPrimitive.Trigger
      ref={forwardedRef}
      asChild
      {...restProps}
    >
      {children}
    </DropdownMenuPrimitive.Trigger>
  )
})

DropdownTrigger.displayName = COMPONENT_NAME
