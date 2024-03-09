import { forwardRef, type ForwardRefRenderFunction } from 'react'
import { motion, type Variants } from 'framer-motion'
import type { TranstionVariantProps } from '@/shared/ui/transition/variants/types.ts'

const slideUp: Variants = {
  enter: { opacity: 0, y: '-100%' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '-100%' },
}

const slideUpConfig = {
  initial: 'enter',
  animate: 'animate',
  exit: 'exit',
  variants: slideUp,
  transition: { duration: 0.3 },
}

const SlideUpTransitionImpl: ForwardRefRenderFunction<
  HTMLDivElement,
  TranstionVariantProps
> = ({ children, ...restProps }, forwardedRef) => {
  return (
    <motion.div
      ref={forwardedRef}
      {...slideUpConfig}
      {...restProps}
    >
      {children}
    </motion.div>
  )
}

export const SlideUpTransition = forwardRef(SlideUpTransitionImpl)
