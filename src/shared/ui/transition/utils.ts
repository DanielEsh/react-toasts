import type { Target, TargetAndTransition, Transition } from 'framer-motion'

export const TRANSITION_TIMING = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
} as const

export const TRANSITION_VARIANTS = {
  fade: {
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  },
}

export const TRANSITION_DEFAULTS = {
  enter: {
    duration: 0.2,
    ease: TRANSITION_TIMING.easeOut,
  },
  exit: {
    duration: 0.1,
    ease: TRANSITION_TIMING.easeIn,
  },
} as const

export type TransitionConfig = WithMotionState<Transition>

export type TransitionEndConfig = WithMotionState<Target>

export type TransitionProperties = {
  /**
   * Custom `transition` definition for `enter` and `exit`
   */
  transition?: TransitionConfig
  /**
   * Custom `transitionEnd` definition for `enter` and `exit`
   */
  transitionEnd?: TransitionEndConfig
  /**
   * Custom `delay` definition for `enter` and `exit`
   */
  delay?: number | DelayConfig
}

type TargetResolver<P = {}> = (
  props: P & TransitionProperties,
) => TargetAndTransition

type Variant<P = {}> = TargetAndTransition | TargetResolver<P>

export type Variants<P = {}> = {
  enter: Variant<P>
  exit: Variant<P>
  initial?: Variant<P>
}

type WithMotionState<P> = Partial<Record<'enter' | 'exit', P>>

export type DelayConfig = WithMotionState<number>

export type WithTransitionConfig<P extends object> = Omit<P, 'transition'> &
  TransitionProperties & {
    /**
     * If `true`, the element will unmount when `in={false}` and animation is done
     */
    unmountOnExit?: boolean
    /**
     * Show the component; triggers when enter or exit states
     */
    in?: boolean
  }

export const withDelay = {
  enter: (
    transition: Transition,
    delay?: number | DelayConfig,
  ): Transition & { delay: number | undefined } => ({
    ...transition,
    delay: typeof delay === 'number' ? delay : delay?.['enter'],
  }),
  exit: (
    transition: Transition,
    delay?: number | DelayConfig,
  ): Transition & { delay: number | undefined } => ({
    ...transition,
    delay: typeof delay === 'number' ? delay : delay?.['exit'],
  }),
}
