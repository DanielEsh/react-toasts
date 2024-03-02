import { forwardRef } from 'react'
import { BaseButton, BaseButtonProps } from './base-button.tsx'

const COMPONENT_NAME = 'BaseButton'

export const Button = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ children, ...restProps }, forwardedRef) => {
    return (
      <BaseButton
        ref={forwardedRef}
        {...restProps}
      >
        {children}
      </BaseButton>
    )
  },
)

Button.displayName = COMPONENT_NAME
