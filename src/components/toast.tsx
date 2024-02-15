import { Icon } from '../icon.tsx'

interface Props {
  title: string
  description?: string
  onCloseClick?: () => void
}

export const Toast = ({ title, description, onCloseClick }: Props) => {
  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>

      <button
        className="toast-close"
        onClick={onCloseClick}
      >
        <Icon name="close" />
      </button>
    </div>
  )
}
