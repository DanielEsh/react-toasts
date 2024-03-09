import { createNotification, type NotificationRenderFn } from '@/notification'
import { getUid } from '@/shared/utils'

export const makeHeadlessNotification = (component: NotificationRenderFn) => {
  createNotification({
    id: getUid(),
    render: component,
  })
}
