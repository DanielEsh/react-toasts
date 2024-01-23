import React from 'react'
import { CSSProperties, useMemo, useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ToastState } from '../state.ts'
import { useQueue } from '../use-queue.ts'
import { ToastContainerPosition, ToastType } from '../types.ts'

interface ToastsProps {
  index: number
  allToastCount: number
  expanded: boolean
  type: ToastType['type']
  duration: ToastType['duration']
  title: string
  description?: string
  onDismiss?: () => void
}

const Toast = (props: ToastsProps) => {
  const toastRef = useRef<HTMLLIElement>(null)
  const toastDurationTimerRef = useRef<HTMLDivElement>(null)
  const hideTimeout = useRef(0)

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // Trigger enter animation without using CSS animation
    setMounted(true)
  }, [])

  console.log('rerender toast')

  const isFront = props.index === 0

  const handleHide = () => {
    props.onDismiss && props.onDismiss()
    window.clearTimeout(hideTimeout.current)
  }

  const handleDelayedHide = () => {
    if (props.duration) {
      hideTimeout.current = window.setTimeout(handleHide, props.duration * 1000)
    }
  }

  const cancelDelayedHide = () => {
    clearTimeout(hideTimeout.current)
  }

  React.useEffect(() => {
    handleDelayedHide()
    return cancelDelayedHide
  }, [props.duration])

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

  // debugger

  return (
    <li
      ref={toastRef}
      className={`toast _${props.type}`}
      data-mounted={mounted}
      style={
        {
          '--index': props.index,
          '--toasts-before': props.index,
          '--z-index': props.allToastCount - props.index,
          '--offset': 14,
        } as CSSProperties
      }
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverLeave}
    >
      <div>{props.title}</div>
      <div>{props.description}</div>
      <div
        className="toast-close"
        onClick={props.onDismiss}
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
  )
}

interface Props {
  position: ToastContainerPosition
}

export const Toasts = (props: Props) => {
  const { position } = props
  const [expanded, setExpanded] = useState(true)
  const { state, queue, add, update } = useQueue<ToastType>({
    limit: 5,
  })

  const removeToast = (toast: ToastType) =>
    update((notifications) =>
      notifications.filter((notification) => {
        return notification.id !== toast.id
      }),
    )

  useEffect(() => {
    return ToastState.subscribe((toast) => {
      console.log('SUB', toast)

      // if (toast.dismiss) {
      //   setToasts((toasts) =>
      //     toasts.map((t) => (t.id === toast.id ? { ...t, delete: true } : t)),
      //   )
      //   return
      // }

      // Prevent batching, temp solution.
      setTimeout(() => {
        ReactDOM.flushSync(() => {
          add(toast)
          // setToasts((toasts) => {
          //   const indexOfExistingToast = toasts.findIndex(
          //     (t) => t.id === toast.id,
          //   )
          //
          //   // Update the toast if it already exists
          //   if (indexOfExistingToast !== -1) {
          //     return [
          //       ...toasts.slice(0, indexOfExistingToast),
          //       { ...toasts[indexOfExistingToast], ...toast },
          //       ...toasts.slice(indexOfExistingToast + 1),
          //     ]
          //   }
          //
          //   return [toast, ...toasts]
          // })
        })
      })
    })
  }, [])

  const toggleExpand = () => {
    // setExpanded(!expanded)
  }

  return (
    <section className="toasts-section">
      <div>queue: {queue.length}</div>
      <ol
        className={`toasts position-${position}`}
        onMouseEnter={toggleExpand}
        onMouseLeave={toggleExpand}
        data-expanded={expanded}
      >
        {state.map((toast, index) => (
          <Toast
            key={toast.id}
            index={index}
            expanded={expanded}
            allToastCount={state.length}
            duration={toast.duration}
            type={toast.type}
            title={toast.title}
            description={toast.description}
            onDismiss={() => removeToast(toast)}
          />
        ))}
      </ol>
    </section>
  )
}
