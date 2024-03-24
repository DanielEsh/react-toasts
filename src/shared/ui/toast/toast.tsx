import type { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Icon } from '../icon/icon.tsx'
import { classNames } from '../../utils'
import { Loader } from '../loader/loader.tsx'

const toastVariants = cva('flex gap-3 border p-4 drop-shadow-md rounded-lg', {
  variants: {
    type: {
      default: 'bg-background border-subtle',
      success: 'bg-success-1 border-success-2 text-success-3',
      info: 'bg-info-1 border-info-2 text-info-3',
      warning: 'bg-warning-1 border-warning-2 text-warning-3',
      error: 'bg-error-1 border-error-2 text-error-3',
      loading: 'bg-background border-subtle',
    },
    defaultVariants: {
      type: 'default',
    },
  },
})

interface Props extends VariantProps<typeof toastVariants> {
  title: string
  icon?: ReactNode
  description?: string
  onCloseClick?: () => void
}

export const Toast = ({
  type = 'default',
  icon,
  title,
  description,
  onCloseClick,
}: Props) => {
  const classes = classNames(toastVariants({ type }))

  return (
    <div className={classes}>
      {type === 'loading' && (
        <div>
          <Loader />
        </div>
      )}
      {icon && <div className="flex-shrink">{icon}</div>}

      <div>
        <div className="font-medium">{title}</div>
        {description && <div className="mt-1 opacity-90">{description}</div>}

        <button
          className="toast-close"
          onClick={onCloseClick}
        >
          <Icon
            name="close"
            size="sm"
          />
        </button>
      </div>
    </div>
  )
}
