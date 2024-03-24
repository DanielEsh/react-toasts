export interface MockNotificationItemType {
  id: number
  title: string
  description?: string
}

function generateNotificationItems(count: number): MockNotificationItemType[] {
  const items: MockNotificationItemType[] = []
  for (let i = 1; i <= count; i++) {
    const notificationItem: MockNotificationItemType = {
      id: i,
      title: `Notification ${i}`,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    }
    items.push(notificationItem)
  }
  return items
}

export const notificationList: MockNotificationItemType[] =
  generateNotificationItems(100)
