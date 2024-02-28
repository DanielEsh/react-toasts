import { CreateNotification, NotificationType } from './types.ts'

interface NotificationPayload {
  action: 'create' | 'update'
  id?: NotificationType['id']
  data: NotificationType
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

  create = (data: NotificationType) => {
    this.publish({
      action: 'create',
      data,
    })
  }

  update = (id: NotificationType['id'], data: NotificationType) => {
    this.publish({
      action: 'update',
      id,
      data,
    })
  }

  promise = (promise: Promise<NotificationType>) => {
    console.log('LOADING...', promise)

    const id = new Date().getTime()

    this.create({
      id: id,
      title: 'promise',
      type: 'loading',
      description: 'Loading...',
    })

    promise
      .then((response) => {
        console.log('RESPONSE', response)
        this.update(id, response)
      })
      .catch((error) => {
        console.log('error', error)
        this.update(id, error)
      })
  }
}

export const NotificationObserver = new Observer()

export const toastFunction = (data: CreateNotification) => {
  const id = data?.id || toastsCounter++

  NotificationObserver.create({
    type: 'default',
    ...data,
    id,
  })
  return id
}

export const updateNotification = (
  id: NotificationType['id'],
  data: NotificationType,
) => {
  NotificationObserver.update(id, data)
}

export const promiseNotification = (promise: Promise<NotificationType>) => {
  NotificationObserver.promise(promise)
}
