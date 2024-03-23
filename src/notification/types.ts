import type { ReactElement } from 'react'

type VerticalPosition = 'top' | 'bottom'
type HorizontalPosition = 'left' | 'center' | 'right'

export type NotificationsContainerPosition =
  `${VerticalPosition}-${HorizontalPosition}`

export enum NOTIFICATION_TYPE {
  DEFAULT = 'default',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  LOADING = 'loading',
}

export interface NotificationCreatePayload {
  action: 'create'
  data: NotificationData
}

export interface NotificationUpdatePayload {
  action: 'update'
  id: NotificationData['id']
  data: NotificationData
}

export interface NotificationDismissPayload {
  action: 'dismiss'
  id: NotificationData['id']
}

export type NotificationPayload =
  | NotificationCreatePayload
  | NotificationUpdatePayload
  | NotificationDismissPayload

export interface NotificationRemoveFn {
  (notification: NotificationData): void
}

export interface NotificationRenderFn {
  (toast: NotificationData, onRemove: NotificationRemoveFn): ReactElement
}

export interface NotificationData {
  // TODO: должно быть обязательное
  id?: number | string
  type: NOTIFICATION_TYPE
  title: string
  description?: string
  duration?: number
  render?: NotificationRenderFn
  onCreate?: (notification?: NotificationData) => void
  onUpdate?: (notification?: NotificationData) => void
  onDismiss?: (notification?: NotificationData) => void
}

export interface NotificationHeightItem {
  notificationId: NotificationData['id']
  height: number
}

export type CreateNotification = Partial<NotificationData>
