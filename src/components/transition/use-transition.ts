import { useCallback, useEffect, useRef, useState } from 'react'

export const PRE_ENTER = 0
export const ENTERING = 1
export const ENTERED = 2
export const PRE_EXIT = 3
export const EXITING = 4
export const EXITED = 5
export const UNMOUNTED = 6

export const STATUS = [
  'preEnter',
  'entering',
  'entered',
  'preExit',
  'exiting',
  'exited',
  'unmounted',
]

enum MyTransitionStatus {
  PRE_ENTER = 'pre_enter',
  ENTERING = 'entering',
  ENTERED = 'entered',
  PRE_EXIT = 'pre_exit',
  EXITING = 'exiting',
  EXITED = 'exited',
}

export const getState = (status) => ({
  _s: status,
  status: STATUS[status],
  isEnter: status < PRE_EXIT,
  isMounted: status !== UNMOUNTED,
})

export const startOrEnd = (unmounted: boolean) => {
  console.log('startOrEnd', unmounted)
  return unmounted ? UNMOUNTED : EXITED
}

export const getEndStatus = (status) => {
  switch (status) {
    case ENTERING:
    case PRE_ENTER:
      return ENTERED

    case EXITING:
    case PRE_EXIT:
      return EXITED
  }
}

export const nextTick = (transitState, status) =>
  setTimeout(() => {
    // Reading document.body.offsetTop can force browser to repaint before transition to the next state
    isNaN(document.body.offsetTop) || transitState(status + 1)
  }, 0)

export const useTransition = ({
  enter = true,
  exit = true,
  preEnter = true,
  preExit = true,
  timeout = 500,
  onStateChange: onChange,
}) => {
  const [state, setState] = useState(getState(ENTERED))

  console.log('INIT', state)
  const latestState = useRef(state)
  const timeoutId = useRef(-1)

  const updateState = (status) => {
    console.log('updateState')
    clearTimeout(timeoutId.current)
    const state = getState(status)
    setState(state)
    latestState.current = state
    onChange && onChange({ current: state })
  }

  const endTransition = () => {
    console.log('endTransition', latestState.current)
    const status = getEndStatus(latestState.current._s)
    status && updateState(status)
  }

  const toggle = useCallback(() => {
    console.log('toggle')
    const transitState = (status) => {
      console.log('transitState', status)
      updateState(status)

      switch (status) {
        case ENTERING:
          timeoutId.current = setTimeout(endTransition, timeout)

          break

        case EXITING:
          timeoutId.current = setTimeout(endTransition, timeout)

          break

        case PRE_ENTER:
        case PRE_EXIT:
          timeoutId.current = nextTick(transitState, status)
          break
      }
    }

    const runEnterFlow = () => {
      console.log('runEnterFlow')
      transitState(enter ? (preEnter ? PRE_ENTER : ENTERING) : ENTERED)
    }

    const runExitFlow = () => {
      console.log('runExitFlow')
      transitState(exit ? (preExit ? PRE_EXIT : EXITING) : EXITED)
    }

    const enterStage = latestState.current.isEnter
    console.log('ENTER STATE', enterStage)
    console.log('LATEST STATE', latestState)
    enterStage ? runExitFlow() : runEnterFlow()
    // if (!enterStage) {
    //   transitState(enter ? (preEnter ? PRE_ENTER : ENTERING) : ENTERED)
    // } else {
    //   transitState(
    //     exit ? (preExit ? PRE_EXIT : EXITING) : startOrEnd(unmountOnExit),
    //   )
    // }
  }, [
    endTransition,
    onChange,
    enter,
    exit,
    preEnter,
    preExit,
    // enterTimeout,
    // exitTimeout,
  ])

  useEffect(() => () => clearTimeout(timeoutId.current), [])

  return [state, toggle, endTransition]
}

interface Options {
  duration: number
}

// const updateState = (status, setState, latestState, timeoutId, onChange) => {
//   clearTimeout(timeoutId.current)
//   const state = getState(status)
//   setState(state)
//   latestState.current = state
//   onChange && onChange({ current: state })
// }

export function useMyTransition({ duration }: Options) {
  const [status, setStatus] = useState<MyTransitionStatus>(
    MyTransitionStatus.ENTERED,
  )
  const latestStatus = useRef<MyTransitionStatus>(status)
  const timeoutRef = useRef(-1)

  const onEnter = () => {
    console.log('on Enter')
  }

  const onExit = () => {
    console.log('on Exit')
  }

  const onEntered = () => {
    console.log('on Entered')
  }

  const onExited = () => {
    console.log('on Exited ')
  }

  const handleStateChange = (shouldMount: boolean) => {
    const preHandler = shouldMount ? onEnter : onExit
    const handler = shouldMount ? onEntered : onExited

    setStatus(
      shouldMount ? MyTransitionStatus.PRE_ENTER : MyTransitionStatus.PRE_EXIT,
    )
    window.clearTimeout(timeoutRef.current)

    const preStateTimeout = window.setTimeout(() => {
      typeof preHandler === 'function' && preHandler()
      setStatus(
        shouldMount ? MyTransitionStatus.ENTERING : MyTransitionStatus.EXITING,
      )
    }, 10)

    timeoutRef.current = window.setTimeout(() => {
      window.clearTimeout(preStateTimeout)
      typeof handler === 'function' && handler()
      setStatus(
        shouldMount ? MyTransitionStatus.ENTERED : MyTransitionStatus.EXITED,
      )
    })
  }

  return {
    status,
    toggle: handleStateChange,
  }
}
