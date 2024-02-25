import { BaseButton } from '../shared/ui'
import {
  createNotificationWithDescription,
  simpleNotifications,
} from '../notification-helpers.ts'

export const NotificationsPage = () => {
  return (
    <div>
      <span>NotificationsPage</span>

      <div className="flex gap-3">
        <BaseButton onClick={simpleNotifications}>
          Simple notification
        </BaseButton>

        <BaseButton onClick={createNotificationWithDescription}>
          Notification with description
        </BaseButton>
      </div>
    </div>
  )
}
