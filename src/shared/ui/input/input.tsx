import { forwardRef, InputHTMLAttributes } from 'react'
import { classNames } from '../../utils'

const COMPONENT_NAME = 'Input'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...restProps }, forwardedRef) => {
    const classes = classNames(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )

    return (
      <input
        type={type}
        className={classes}
        ref={forwardedRef}
        {...restProps}
      />
    )
  },
)

Input.displayName = COMPONENT_NAME
