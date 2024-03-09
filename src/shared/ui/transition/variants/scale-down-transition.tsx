import { forwardRef, type ForwardRefRenderFunction } from 'react'
import { motion, type Variants } from 'framer-motion'
import type { TranstionVariantProps } from '@/shared/ui/transition/variants/types.ts'

const scaleDownVariant: Variants = {
  enter: {
    scale: 0.8,
    y: '100%',
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      scale: {
        duration: 0.3,
      },
      y: {
        duration: 0.3,
      },
      opacity: {
        duration: 0.3,
      },
    },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    y: '100%',
    transition: {
      scale: {
        duration: 0.3,
      },
      y: {
        duration: 0.3,
      },
      opacity: {
        duration: 0.3,
      },
    },
  },
}

const scaleDownConfig = {
  initial: 'enter',
  animate: 'animate',
  exit: 'exit',
  variants: scaleDownVariant,
}

const ScaleDownTransitionImpl: ForwardRefRenderFunction<
  HTMLDivElement,
  TranstionVariantProps
> = ({ children, ...restProps }, forwardedRef) => {
  return (
    <motion.div
      ref={forwardedRef}
      {...scaleDownConfig}
      {...restProps}
    >
      {children}
    </motion.div>
  )
}

export const ScaleDownTransition = forwardRef(ScaleDownTransitionImpl)
