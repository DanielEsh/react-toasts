import type { ToastType } from '../types.ts'

interface Props {
  type: ToastType['type']
  title: string
  description?: string
  onCloseClick?: () => void
}

export const Toast = ({ title, description, type, onCloseClick }: Props) => {
  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>

      <div
        className="toast-close"
        onClick={onCloseClick}
      >
        close
      </div>
    </div>
  )
}
