import {
  type CreateNotification,
  NOTIFICATION_TYPE,
  type NotificationData,
} from './types.ts'

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

let toastsCounter = 1

export class NotificationGroupObserver {
  private subscribers: Array<(toast: NotificationPayload) => void>

  constructor() {
    this.subscribers = []
  }

  private publish = (payload: NotificationPayload) => {
    this.subscribers.forEach((subscriber) => subscriber(payload))
  }

  public subscribe = (subscriber: (payload: NotificationPayload) => void) => {
    this.subscribers.push(subscriber)

    return () => {
      const index = this.subscribers.indexOf(subscriber)
      this.subscribers.splice(index, 1)
    }
  }

  public create = (data: CreateNotification) => {
    const id = data?.id || toastsCounter++

    const createdData: NotificationData = {
      type: NOTIFICATION_TYPE.DEFAULT,
      title: 'Created Title',
      ...data,
      id,
    }

    this.publish({
      action: 'create',
      data: createdData,
    })

    return id
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

  dismiss = (dismissedId: NotificationData['id']) => {
    this.publish({
      action: 'dismiss',
      id: dismissedId,
    })
  }
}

export const NotificationObserver = new NotificationGroupObserver()

export const createNotification = (data: CreateNotification) => {
  NotificationObserver.create(data)
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
