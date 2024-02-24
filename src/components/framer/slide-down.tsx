import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
}

export const SlideDown = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
