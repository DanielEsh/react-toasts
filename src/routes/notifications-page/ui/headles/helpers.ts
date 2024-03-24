import {
  Notification,
  type NotificationRenderFn,
} from '@/modules/core/notification'
import { getUid } from '@/shared/utils'

export const makeHeadlessNotification = (component: NotificationRenderFn) => {
  Notification.create({
    id: getUid(),
    render: component,
  })
}
