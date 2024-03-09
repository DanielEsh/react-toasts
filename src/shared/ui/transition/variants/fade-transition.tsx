import { forwardRef, type ForwardRefRenderFunction } from 'react'
import { motion, type Variants } from 'framer-motion'
import type { TranstionVariantProps } from './types.ts'

const fade: Variants = {
  enter: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const fadeConfig = {
  initial: 'enter',
  animate: 'animate',
  exit: 'exit',
  variants: fade,
}

const FadeTransitionImpl: ForwardRefRenderFunction<
  HTMLDivElement,
  TranstionVariantProps
> = ({ children }, forwardedRef) => {
  return (
    <motion.div
      ref={forwardedRef}
      {...fadeConfig}
    >
      {children}
    </motion.div>
  )
}

export const FadeTransition = forwardRef(FadeTransitionImpl)
