import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

const COMPONENT_NAME = 'DropdownItem'

export const DropdownItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>((props, forwardedRef) => {
  const { children, ...restProps } = props

  return (
    <DropdownMenuPrimitive.Item
      ref={forwardedRef}
      className="relative flex cursor-pointer select-none items-center rounded-sm py-2 px-3.5 text-sm outline-none hover:bg-neutral-200 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      {...restProps}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  )
})

DropdownItem.displayName = COMPONENT_NAME
