import React from 'react'
import { CSSProperties, useMemo, useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ToastState } from '../state.ts'
import { useQueue } from '../use-queue.ts'
import { HeightT, ToastContainerPosition, ToastType } from '../types.ts'

interface ToastsProps {
  index: number
  allToastCount: number
  id: number
  type: ToastType['type']
  duration: ToastType['duration']
  title: string
  description?: string
  frontHeight: any
  setFrontHeight: (height: number) => void
  heights: any
  setHeights: any
  onDismiss?: () => void
}

const Toast = (props: ToastsProps) => {
  const toastRef = useRef<HTMLLIElement>(null)
  const toastDurationTimerRef = useRef<HTMLDivElement>(null)
  const hideTimeout = useRef(0)

  const [mounted, setMounted] = React.useState(false)
  const [removed, setRemoved] = React.useState(false)
  const [initialHeight, setInitialHeight] = React.useState(0)

  React.useEffect(() => {
    // Trigger enter animation without using CSS animation
    setMounted(true)
  }, [])

  const isFront = props.index === 0

  const heightIndex = React.useMemo(
    () => props.heights.findIndex((height) => height.toastId === props.id) || 0,
    [props.heights, props.id],
  )

  const toastsHeightBefore = React.useMemo(() => {
    return props.heights.reduce((prev, curr, reducerIndex) => {
      // Calculate offset up until current  toast
      if (reducerIndex >= heightIndex) {
        return prev
      }

      return prev + curr.height
    }, 0)
  }, [props.heights, heightIndex])

  const offset = React.useRef(0)
  offset.current = React.useMemo(
    () => heightIndex * 16 + toastsHeightBefore,
    [heightIndex, toastsHeightBefore],
  )

  React.useLayoutEffect(() => {
    if (!mounted) return
    const toastNode = toastRef.current

    const originalHeight = toastNode.style.height
    toastNode.style.height = 'auto'
    const newHeight = toastNode.getBoundingClientRect().height
    toastNode.style.height = originalHeight

    if (isFront) {
      props.setFrontHeight(newHeight)
    }

    setInitialHeight(newHeight)
    props.setHeights((heights) => {
      const alreadyExists = heights.find(
        (height) => height.toastId === props.id,
      )
      if (!alreadyExists) {
        return [...heights, { toastId: props.id, height: newHeight }]
      } else {
        return heights.map((height) =>
          height.toastId === props.id
            ? { ...height, height: newHeight }
            : height,
        )
      }
    })
  }, [mounted, props.setHeights, props.id])
  console.log('rerender toast', mounted)

  const handleHide = () => {
    props.onDismiss && props.onDismiss()
    window.clearTimeout(hideTimeout.current)
  }

  const handleDelayedHide = () => {
    if (props.duration) {
      hideTimeout.current = window.setTimeout(
        handleRemove,
        props.duration * 1000,
      )
    }
  }

  const cancelDelayedHide = () => {
    clearTimeout(hideTimeout.current)
  }

  React.useEffect(() => {
    handleDelayedHide()
    return cancelDelayedHide
  }, [props.duration])

  React.useEffect(() => {
    const toastNode = toastRef.current
    console.log('use effect', props.heights)

    if (toastNode) {
      const height = toastNode.getBoundingClientRect().height
      setInitialHeight(height)
      props.setHeights((h: any) => [...h, { toastId: props.id, height }])

      return () =>
        props.setHeights((h: any) =>
          h.filter((height: any) => height.toastId !== props.id),
        )
    }
  }, [props.setHeights, props.id])

  const handleHover = () => {
    console.log('hover')
    if (toastDurationTimerRef.current) {
      toastDurationTimerRef.current.style.animationPlayState = 'paused'
    }
    cancelDelayedHide()
  }

  const handleHoverLeave = () => {
    console.log('leave')
    if (toastDurationTimerRef.current) {
      toastDurationTimerRef.current.style.animationPlayState = 'running'
      toastDurationTimerRef.current.style.animation
    }
    handleDelayedHide()
  }

  const deleteToast = React.useCallback(() => {
    // Save the offset for the exit swipe animation
    setRemoved(true)
    props.setHeights((h) => h.filter((height) => height.toastId !== props.id))

    // Добавим задержку перед вызовом onDelete() для завершения анимации
    setTimeout(() => {
      props.onDismiss && props.onDismiss()
    }, 300)
  }, [removed, props.setHeights, offset])

  const handleRemove = () => {
    deleteToast()
  }

  return (
    <>
      <li
        ref={toastRef}
        className={`toast _${props.type}`}
        data-mounted={mounted}
        data-removed={removed}
        data-expanded={true}
        data-front={isFront}
        style={
          {
            '--index': props.index,
            '--toasts-before': props.index,
            '--z-index': props.allToastCount - props.index,
            '--offset': `${offset.current}px`,
            '--initial-height': 'auto',
            '--front-toast-height': `${props.frontHeight}px`,
          } as CSSProperties
        }
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverLeave}
      >
        <div>{props.title}</div>
        <div>{props.description}</div>
        <div
          className="toast-close"
          onClick={handleRemove}
        >
          close
        </div>
        {props.duration && (
          <div
            ref={toastDurationTimerRef}
            className="durationTimer"
            style={
              {
                '--duration': `${props.duration}s`,
              } as CSSProperties
            }
          />
        )}
      </li>
    </>
  )
}

interface Props {
  position: ToastContainerPosition
}

export const Toasts = (props: Props) => {
  const { position } = props
  const { state, queue, add, update } = useQueue<ToastType>({
    limit: 5,
  })
  const [frontHeight, setFrontHeight] = React.useState(0)
  const [heights, setHeights] = React.useState<any>([])
  const removeToast = (toast: ToastType) =>
    update((notifications) =>
      notifications.filter((notification) => {
        return notification.id !== toast.id
      }),
    )

  useEffect(() => {
    return ToastState.subscribe((toast) => {
      console.log('SUB', toast)

      ReactDOM.flushSync(() => {
        add(toast)
      })
    })
  }, [])

  return (
    <section className="toasts-section">
      <div>queue: {queue.length}</div>
      <ol className={`toasts position-${position}`}>
        {state.map((toast, index) => (
          <Toast
            key={toast.id}
            id={toast.id}
            index={index}
            allToastCount={state.length}
            duration={toast.duration}
            type={toast.type}
            title={toast.title}
            description={toast.description}
            frontHeight={frontHeight}
            setFrontHeight={setFrontHeight}
            heights={heights}
            setHeights={setHeights}
            onDismiss={() => removeToast(toast)}
          />
        ))}
      </ol>
    </section>
  )
}
