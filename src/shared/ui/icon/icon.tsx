import type { SVGProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { classNames } from '@/shared/utils'

const iconVariant = cva('', {
  variants: {
    size: {
      sm: 'h-[20px] w-[20px]',
      md: 'h-[24px] w-[24px]',
    },
    defaultVariants: {
      sie: 'md',
    },
  },
})

export interface IconProps
  extends VariantProps<typeof iconVariant>,
    SVGProps<SVGSVGElement> {
  name: string
}

export function Icon({ name, className, viewBox, size, ...props }: IconProps) {
  return (
    <svg
      className={classNames(className, iconVariant({ size }))}
      viewBox={viewBox}
      focusable="false"
      aria-hidden
      {...props}
    >
      <use href={`sprites/sprite.svg#${name}`} />
    </svg>
  )
}
