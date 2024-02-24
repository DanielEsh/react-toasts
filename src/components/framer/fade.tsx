import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const FadeAnimation = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      {children}
    </motion.div>
  )
}
