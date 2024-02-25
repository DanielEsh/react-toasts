import { toastFunction } from './state.ts'

export const simpleNotifications = () => {
  toastFunction({
    id: new Date().getTime(),
    title: 'Simple notification',
    description: 'Simple notification with description and default style.',
  })
}

export const createNotificationWithDescription = () => {
  toastFunction({
    id: 'description',
    title: 'with description',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  })
}
