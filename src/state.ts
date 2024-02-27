import { CreateNotification, NotificationType } from './types.ts'

let toastsCounter = 1

class Observer {
  private subscribers: Array<(toast: NotificationType) => void>

  constructor() {
    this.subscribers = []
  }

  subscribe = (subscriber: (toast: NotificationType) => void) => {
    this.subscribers.push(subscriber)

    return () => {
      const index = this.subscribers.indexOf(subscriber)
      this.subscribers.splice(index, 1)
    }
  }

  publish = (data: any) => {
    this.subscribers.forEach((subscriber) => subscriber(data))
  }

  create = (data: NotificationType) => {
    this.publish(data)
  }

  update = (id: NotificationType['id']) => {
    this.publish(id)
  }

  promise = (promise: Promise<NotificationType>, data?: NotificationType) => {
    console.log('LOADING...', promise)
    this.create({
      id: 'promise',
      title: 'promise',
      type: 'loading',
      description: 'Loading...',
    })

    promise
      .then((response) => {
        console.log('RESPONSE', response)
        this.update('promise')
      })
      .catch((error) => {
        console.log('error', error)
        this.update('promise')
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

export const updateNotification = (id: NotificationType['id']) => {
  NotificationObserver.update(id)
}

export const promiseNotification = (promise: Promise<NotificationType>) => {
  NotificationObserver.promise(promise)
}
