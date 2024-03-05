import type { ReactNode } from 'react'
import {
  type HTMLMotionProps,
  motion,
  type Variants as _Variants,
} from 'framer-motion'
import {
  TRANSITION_DEFAULTS,
  type Variants,
  withDelay,
  type WithTransitionConfig,
} from './utils.ts'

const variants: Variants = {
  enter: ({ transition, transitionEnd, delay } = {}) => ({
    opacity: 1,
    transition:
      transition?.enter ?? withDelay.enter(TRANSITION_DEFAULTS.enter, delay),
    transitionEnd: transitionEnd?.enter,
  }),
  exit: ({ transition, transitionEnd, delay } = {}) => ({
    opacity: 0,
    transition:
      transition?.exit ?? withDelay.exit(TRANSITION_DEFAULTS.exit, delay),
    transitionEnd: transitionEnd?.exit,
  }),
}

export const fadeConfig: HTMLMotionProps<'div'> = {
  initial: 'exit',
  animate: 'enter',
  exit: 'exit',
  variants: variants as _Variants,
}

interface Props extends WithTransitionConfig<HTMLMotionProps<'div'>> {
  children: ReactNode
}

export const FadeTransition = ({ children }: Props) => {
  return <motion.div {...fadeConfig}>{children}</motion.div>
}
