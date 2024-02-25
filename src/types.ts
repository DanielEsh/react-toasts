type VerticalPosition = 'top' | 'bottom'
type HorizontalPosition = 'left' | 'center' | 'right'

export type ToastContainerPosition = `${VerticalPosition}-${HorizontalPosition}`

export interface ToastType {
  id?: number | string
  type?: 'default' | 'success' | 'info' | 'warning' | 'error' | 'loading'
  title: string
  description?: string
  duration: number
}

export interface NotificationHeightItem {
  toastId: ToastType['id']
  height: number
}

export interface NotificationType {
  id: number | string
  type: 'default' | 'success' | 'info' | 'warning' | 'error' | 'loading'
  title: string
  description?: string
  duration?: number
}

export type CreateNotification = Omit<NotificationType, 'id' | 'type'> & {
  id?: number | string
  type?: 'default' | 'success' | 'info' | 'warning' | 'error' | 'loading'
}
