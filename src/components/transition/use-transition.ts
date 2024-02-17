import { useCallback, useEffect, useRef, useState } from 'react'

export const PRE_ENTER = 0
export const ENTERING = 1
export const ENTERED = 2
export const PRE_EXIT = 3
export const EXITING = 4
export const EXITED = 5
export const UNMOUNTED = 6

export const STATUS: Status[] = [
  'preEnter',
  'entering',
  'entered',
  'preExit',
  'exiting',
  'exited',
]

type Status =
  | 'preEnter'
  | 'entering'
  | 'entered'
  | 'preExit'
  | 'exiting'
  | 'exited'

export interface TransitionState {
  status: Status
  isEnter: boolean
  isMounted: boolean
}

export const getState = (status: number): TransitionState => ({
  status: STATUS[status],
  isEnter: status < PRE_EXIT,
  isMounted: status !== UNMOUNTED,
})

export const startOrEnd = (unmounted: boolean) => {
  console.log('startOrEnd', unmounted)
  return unmounted ? UNMOUNTED : EXITED
}

export const nextTick = (transitState, status) =>
  setTimeout(() => {
    // Reading document.body.offsetTop can force browser to repaint before transition to the next state
    isNaN(document.body.offsetTop) || transitState(status + 1)
  }, 0)

type TransitionFlow = 'enter' | 'exit'

interface UseTransitionOptions {
  timeout: number
  initialEntered: boolean
  onStateChange?: (state?: TransitionState) => void
}

export const useTransition = ({
  timeout = 500,
  initialEntered = true,
  onStateChange,
}: UseTransitionOptions) => {
  const [state, setState] = useState(
    getState(initialEntered ? ENTERED : EXITED),
  )

  console.log('INIT', state)
  const latestState = useRef(state)
  const timeoutId = useRef(-1)

  const updateState = (status: number) => {
    console.log('updateState')
    clearTimeout(timeoutId.current)
    const state = getState(status)
    setState(state)
    latestState.current = state
    onStateChange && onStateChange(state)
  }

  const endTransition = (flow: TransitionFlow) => {
    console.log('endTransition', latestState.current)
    const status = flow === 'enter' ? ENTERED : EXITED
    updateState(status)
  }

  const toggle = useCallback(() => {
    console.log('toggle')
    const transitState = (status: number) => {
      console.log('transitState', status)
      updateState(status)

      switch (status) {
        case ENTERING:
          timeoutId.current = setTimeout(() => endTransition('enter'), timeout)

          break

        case EXITING:
          timeoutId.current = setTimeout(() => endTransition('exit'), timeout)

          break

        case PRE_ENTER:
        case PRE_EXIT:
          timeoutId.current = nextTick(transitState, status)
          break
      }
    }

    const runEnterFlow = () => {
      console.log('runEnterFlow')
      transitState(PRE_ENTER)
    }

    const runExitFlow = () => {
      console.log('runExitFlow')
      transitState(PRE_EXIT)
    }

    const enterStage = latestState.current.isEnter
    console.log('ENTER STATE', enterStage)
    console.log('LATEST STATE', latestState)
    enterStage ? runExitFlow() : runEnterFlow()
  }, [
    endTransition,
    // enterTimeout,
    // exitTimeout,
  ])

  useEffect(() => () => clearTimeout(timeoutId.current), [])

  return {
    state,
    toggle,
  }
}
