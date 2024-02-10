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

      <div
        className="toast-close"
        onClick={onCloseClick}
      >
        close
      </div>
    </div>
  )
}
