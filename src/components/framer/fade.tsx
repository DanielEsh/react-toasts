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
}

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

export const FadeAnimation = ({ children }: Props) => {
  // return (
  //   <motion.div
  //     initial="enter"
  //     animate="animate"
  //     exit="exit"
  //     variants={fade}
  //   >
  //     {children}
  //   </motion.div>
  // )

  return <motion.div {...fadeConfig}>{children}</motion.div>
}
