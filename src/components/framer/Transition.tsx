import type { ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import { FadeAnimation } from '@/components/framer/fade.tsx'
import { ScaleAnimation } from '@/components/framer/scale.tsx'

interface Props {
  in: boolean
  variant: 'fade' | 'scale'
  children: ReactNode
  keepMounted?: boolean
  initial?: boolean
  className?: string
}

export const Transition = (props: Props) => {
  const {
    in: isOpen,
    keepMounted = true,
    initial = true,
    className,
    children,
    variant,
  } = props

  const show = keepMounted ? isOpen && keepMounted : true

  const renderVariant = (variant: 'fade' | 'scale', children: ReactNode) => {
    const transitionMap = {
      fade: FadeAnimation,
      scale: ScaleAnimation,
    }

    const SelectedTransitionVariant = transitionMap[variant]

    return (
      <SelectedTransitionVariant className={className}>
        {children}
      </SelectedTransitionVariant>
    )
  }

  return (
    <AnimatePresence initial={initial}>
      {show && renderVariant(variant, children)}
    </AnimatePresence>
  )
}
