import { forwardRef, type ForwardRefRenderFunction } from 'react'
import { motion, type Variants } from 'framer-motion'
import type { TranstionVariantProps } from '@/shared/ui/transition/variants/types.ts'

const scaleVariant: Variants = {
  enter: {
    scale: 0.5,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const scaleConfig = {
  initial: 'enter',
  animate: 'animate',
  exit: 'exit',
  variants: scaleVariant,
}

const ScaleTransitionImpl: ForwardRefRenderFunction<
  HTMLDivElement,
  TranstionVariantProps
> = ({ children }, forwardedRef) => {
  return (
    <motion.div
      ref={forwardedRef}
      {...scaleConfig}
    >
      {children}
    </motion.div>
  )
}

export const ScaleTransition = forwardRef(ScaleTransitionImpl)
