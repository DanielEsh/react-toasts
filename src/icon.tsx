import type { SVGProps } from 'react'

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: string
}

export function Icon({ name, className, viewBox, ...props }: IconProps) {
  return (
    <svg
      className="h-[24px] w-[24px]"
      viewBox={viewBox}
      focusable="false"
      aria-hidden
      {...props}
    >
      <use href={`sprites/sprite.svg#${name}`} />
    </svg>
  )
}
