import { forwardRef, type ForwardRefRenderFunction } from 'react'

import { motion, type Variants } from 'framer-motion'

import type { TranstionVariantProps } from '@/shared/ui/transition/variants/types.ts'

const slideRight: Variants = {
  enter: { opacity: 0, x: '100%' },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: '100%' },
}

const slideDownConfig = {
  initial: 'enter',
  animate: 'animate',
  exit: 'exit',
  variants: slideRight,
  transition: { duration: 0.3 },
}

const SlideRightTransitionImpl: ForwardRefRenderFunction<
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

export const SlideRightTransition = forwardRef(SlideRightTransitionImpl)
