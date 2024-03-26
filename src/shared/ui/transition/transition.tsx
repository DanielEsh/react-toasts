import {
  forwardRef,
  type ForwardRefExoticComponent,
  type ForwardRefRenderFunction,
  type ReactNode,
  type RefAttributes,
} from 'react'

import { AnimatePresence } from 'framer-motion'

import {
  FadeTransition,
  ScaleTransition,
  ScaleDownTransition,
  SlideUpTransition,
  SlideDownTransition,
  SlideRightTransition,
  SlideLeftTransition,
  type TranstionVariantProps,
} from './variants'

type TransitionVariants =
  | 'fade'
  | 'scale'
  | 'scale-down'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'

interface Props {
  in: boolean
  variant: TransitionVariants
  children: ReactNode
  keepMounted?: boolean
  initial?: boolean
  className?: string
}

const TransitionImpl: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  props,
  forwardedRef,
) => {
  const {
    in: isOpen,
    keepMounted = true,
    initial = true,
    className,
    children,
    variant,
  } = props

  const show = keepMounted ? isOpen && keepMounted : true

  const renderVariant = (variant: TransitionVariants, children: ReactNode) => {
    const transitionMap: Record<
      TransitionVariants,
      ForwardRefExoticComponent<
        TranstionVariantProps & RefAttributes<HTMLDivElement>
      >
    > = {
      fade: FadeTransition,
      scale: ScaleTransition,
      'scale-down': ScaleDownTransition,
      'slide-down': SlideDownTransition,
      'slide-up': SlideUpTransition,
      'slide-right': SlideRightTransition,
      'slide-left': SlideLeftTransition,
    }

    const SelectedTransitionVariant = transitionMap[variant]

    return (
      <SelectedTransitionVariant
        ref={forwardedRef}
        className={className}
      >
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

export const Transition = forwardRef(TransitionImpl)
