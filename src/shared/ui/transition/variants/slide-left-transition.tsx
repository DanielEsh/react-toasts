import { forwardRef, type ForwardRefRenderFunction } from 'react'
import { motion, type Variants } from 'framer-motion'
import type { TranstionVariantProps } from '@/shared/ui/transition/variants/types.ts'

const slideLeft: Variants = {
  enter: { opacity: 0, x: '-100%' },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: '-100%' },
}

const slideLeftConfig = {
  initial: 'enter',
  animate: 'animate',
  exit: 'exit',
  variants: slideLeft,
  transition: { duration: 0.3 },
}

const SlideLeftTransitionImpl: ForwardRefRenderFunction<
  HTMLDivElement,
  TranstionVariantProps
> = ({ children, ...restProps }, forwardedRef) => {
  return (
    <motion.div
      ref={forwardedRef}
      {...slideLeftConfig}
      {...restProps}
    >
      {children}
    </motion.div>
  )
}

export const SlideLeftTransition = forwardRef(SlideLeftTransitionImpl)
