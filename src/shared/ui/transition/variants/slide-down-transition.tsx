import { forwardRef, type ForwardRefRenderFunction } from 'react'

import { motion, type Variants } from 'framer-motion'

import type { TranstionVariantProps } from '@/shared/ui/transition/variants/types.ts'

const slideDown: Variants = {
  enter: { opacity: 0, y: '100%' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '100%' },
}

const slideDownConfig = {
  initial: 'enter',
  animate: 'animate',
  exit: 'exit',
  variants: slideDown,
  transition: { duration: 0.3 },
}

const SlideDownTransitionImpl: ForwardRefRenderFunction<
  HTMLDivElement,
  TranstionVariantProps
> = ({ children, ...restProps }, forwardedRef) => {
  return (
    <motion.div
      ref={forwardedRef}
      {...slideDownConfig}
      {...restProps}
    >
      {children}
    </motion.div>
  )
}

export const SlideDownTransition = forwardRef(SlideDownTransitionImpl)
