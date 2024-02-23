import { Icon } from '../icon.tsx'

interface Props {
  title: string
  description?: string
  onCloseClick?: () => void
}

export const Toast = ({ title, description, onCloseClick }: Props) => {
  return (
    <div className="bg-background border border-subtle p-4 drop-shadow-md rounded-lg">
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
