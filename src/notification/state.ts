import {
  type CreateNotification,
  NOTIFICATION_TYPE,
  type NotificationData,
} from './types.ts'

interface NotificationPayload {
  action: 'create' | 'update'
  id?: NotificationData['id']
  data: NotificationData
}

let toastsCounter = 1

class Observer {
  private subscribers: Array<(toast: NotificationPayload) => void>

  constructor() {
    this.subscribers = []
  }

  subscribe = (subscriber: (payload: NotificationPayload) => void) => {
    this.subscribers.push(subscriber)

    return () => {
      const index = this.subscribers.indexOf(subscriber)
      this.subscribers.splice(index, 1)
    }
  }

  publish = (payload: NotificationPayload) => {
    this.subscribers.forEach((subscriber) => subscriber(payload))
  }

  create = (data: NotificationData) => {
    this.publish({
      action: 'create',
      data,
    })
  }

  update = (id: NotificationData['id'], data: NotificationData) => {
    this.publish({
      action: 'update',
      id,
      data,
    })
  }

  promise = (promise: Promise<NotificationData>) => {
    console.log('LOADING...', promise)

    const id = toastsCounter++

    this.create({
      id: id,
      title: 'promise',
      type: NOTIFICATION_TYPE.LOADING,
      description: 'Loading...',
    })

    promise
      .then((response) => {
        this.update(id, response)
      })
      .catch((error) => {
        this.update(id, error)
      })
  }
}

export const NotificationObserver = new Observer()

export const createNotification = (data: CreateNotification) => {
  const id = data?.id || toastsCounter++

  NotificationObserver.create(<NotificationData>{
    type: NOTIFICATION_TYPE.DEFAULT,
    ...data,
    id,
  })
  return id
}

export const updateNotification = (
  id: NotificationData['id'],
  data: NotificationData,
) => {
  NotificationObserver.update(id, data)
}

export const promiseNotification = (promise: Promise<NotificationData>) => {
  NotificationObserver.promise(promise)
}
