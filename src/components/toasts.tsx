import React from 'react'
import { CSSProperties, useMemo, useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ToastState } from '../state.ts'
import {useQueue} from "../use-queue.ts";

interface ToastsProps {
  index: number
  title: string
  description?: string
  onDismiss?: () => void
}

const Toast = (props: ToastsProps) => {
  const toastRef = useRef<HTMLLIElement>(null)

  return (
    <li
      ref={toastRef}
      className="toast"
      style={
        {
          '--index': props.index,
          '--offset': 14 * props.index,
        } as CSSProperties
      }
    >
      <div>{props.title}</div>
      <div>{props.description}</div>
      <div className="toast-close" onClick={props.onDismiss}>close</div>
    </li>
  )
}

interface ToastData {
  id: number
  title: string
  description?: string
}

const initialPropsData: ToastData[] = [
  {
    id: 1,
    title: 'title',
    description: 'description',
  },
  {
    id: 2,
    title: 'title',
    description: 'description',
  },
  {
    id: 3,
    title: 'title',
    description: 'description',
  },
]

export const Toasts = () => {
  const [toasts, setToasts] = useState<any[]>([])
  const {state, queue, add, update} = useQueue<ToastType>({
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

      if ((toast).dismiss) {
        setToasts((toasts) => toasts.map((t) => (t.id === toast.id ? { ...t, delete: true } : t)));
        return;
      }

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

  return (
    <section className="toasts-section">
      <ol className="toasts">
        <div>queue: {queue.length}</div>
        {state.map((toast, index) => (
          <Toast
            key={toast.id}
            index={index}
            title={toast.title}
            description={toast.description}
            onDismiss={() => removeToast(toast)}
          />
        ))}
      </ol>
    </section>
  )
}
