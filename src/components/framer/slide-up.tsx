import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
}

export const SlideUp = ({ children, className }: Props) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: '-100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
