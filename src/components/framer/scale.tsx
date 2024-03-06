import { motion, type Variants, type Variant } from 'framer-motion'
import type { ReactNode } from 'react'
import { TRANSITION_TIMING, withDelay } from '@/shared/ui/transition/utils.ts'

export const TRANSITION_DEFAULTS = {
  enter: {
    duration: 0.5,
    ease: TRANSITION_TIMING.easeOut,
  },
  exit: {
    duration: 0.5,
    ease: TRANSITION_TIMING.easeIn,
  },
} as const

interface Props {
  children: ReactNode
  className?: string
}

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

const scaleTransition = {
  initial: 'enter',
  animate: 'animate',
  exit: 'exit',
  variants: scaleVariant,
}

export const ScaleAnimation = ({ children, className }: Props) => {
  return (
    <motion.div
      className={className}
      {...scaleTransition}
    >
      {children}
    </motion.div>
  )
}
