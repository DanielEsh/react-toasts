import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const fade = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.7,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.7,
    },
  },
}

export const FadeAnimation = ({ children }: Props) => {
  return (
    <motion.div
      variants={fade}
      {...fade}
    >
      {children}
    </motion.div>
  )
}
