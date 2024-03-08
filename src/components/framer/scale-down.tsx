import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

const scaleDownVariant: Variants = {
  enter: {
    scale: 0,
    y: '100%',
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      scale: {
        duration: 0.5,
      },
      y: {
        duration: 0.5,
      },
      opacity: {
        duration: 0.3,
      },
    },
  },
  exit: {
    scale: 0.5,
    opacity: 0,
    y: '100%',
    transition: {
      scale: {
        duration: 0.5,
      },
      y: {
        duration: 0.5,
      },
      opacity: {
        duration: 0.3,
      },
    },
  },
}

const scaleDownTransition = {
  initial: 'enter',
  animate: 'animate',
  exit: 'exit',
  variants: scaleDownVariant,
}

export const ScaleDownAnimation = ({ children, className }: Props) => {
  return (
    <motion.div
      className={className}
      {...scaleDownTransition}
    >
      {children}
    </motion.div>
  )
}
