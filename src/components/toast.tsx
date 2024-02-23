import { cva, VariantProps } from 'class-variance-authority'
import { Icon } from '../icon.tsx'
import { classNames } from '../class-names.ts'

const toastVariants = cva('border p-4 drop-shadow-md rounded-lg', {
  variants: {
    type: {
      default: 'bg-background border-subtle',
      success: 'bg-success-1 border-success-2 text-success-3',
      info: 'bg-info-1 border-info-2 text-info-3',
      warning: 'bg-warning-1 border-warning-2 text-warning-3',
      error: 'bg-error-1 border-error-2 text-error-3',
    },
    defaultVariants: {
      type: 'default',
    },
  },
})

interface Props extends VariantProps<typeof toastVariants> {
  title: string
  description?: string
  onCloseClick?: () => void
}

export const Toast = ({
  type = 'default',
  title,
  description,
  onCloseClick,
}: Props) => {
  const classes = classNames(toastVariants({ type }))

  return (
    <div className={classes}>
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
