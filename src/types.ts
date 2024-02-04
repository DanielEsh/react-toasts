type VerticalPosition = 'top' | 'bottom'
type HorizontalPosition = 'left' | 'center' | 'right'

export type ToastContainerPosition = `${VerticalPosition}-${HorizontalPosition}`

export interface ToastType {
  id?: number | string
  type?: 'default' | 'success' | 'info' | 'warning' | 'error'
  title: string
  description?: string
  duration: number
}

export interface ToastHeightItem {
  toastId: ToastType['id']
  height: number
}
