let toastsCounter = 1

class Observer {
  private subscribers: Array<(toast: any) => void>
  private toasts: any

  constructor() {
    this.subscribers = []
    this.toasts = []
  }

  subscribe = (subscriber: (toast: any) => void) => {
    this.subscribers.push(subscriber)

    return () => {
      const index = this.subscribers.indexOf(subscriber)
      this.subscribers.splice(index, 1)
    }
  }

  publish = (data: any) => {
    this.subscribers.forEach((subscriber) => subscriber(data))
  }

  addToast = (data: any) => {
    this.publish(data)
    this.toasts = [...this.toasts, data]
  }

  create = (data: any) => {
    const { message, ...rest } = data
    const id =
      typeof data?.id === 'number' || data.id?.length > 0
        ? data.id
        : toastsCounter++
    this.addToast({ title: message, ...rest, id })

    return id
  }

  dismiss = (id?: number | string) => {
    console.log('STATE DISMISS', id)
    if (!id) {
      this.toasts.forEach((toast) => {
        this.subscribers.forEach((subscriber) => subscriber({ id: toast.id, dismiss: true }));
      });
    }

    this.subscribers.forEach((subscriber) => subscriber({ id, dismiss: true }));
    return id;
  };
}

export const ToastState = new Observer()

export const toastFunction = (message: string, data: any) => {
  const id = data?.id || toastsCounter++

  ToastState.addToast({
    title: message,
    ...data,
    id,
  })
  return id
}
