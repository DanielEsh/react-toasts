import { createNotification, type NotificationData } from './notification'

export const simpleNotifications = () => {
  createNotification({
    id: new Date().getTime(),
    title: 'Simple notification',
    description: 'Simple notification with description and default style.',
  })
}

export const createNotificationWithDescription = () => {
  createNotification({
    id: 'description',
    title: 'with description',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  })
}

export const createNotificationWithType = (type: NotificationData['type']) => {
  createNotification({
    id: new Date().getTime(),
    title: `Simple ${type} notification`,
    type: type,
    duration: 5,
    description: 'Simple notification with description and default style.',
  })
}
