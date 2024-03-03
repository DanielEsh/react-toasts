import { Button } from '@/shared/ui'
import {
  NOTIFICATION_TYPE,
  type NotificationData,
  promiseNotification,
} from '@/notification'
import { getUid } from '@/shared/utils'

const PROMISE_TIMEOUT = 2_000

const makePromiseSuccess = () => {
  const promise = () =>
    new Promise<NotificationData>((resolve) =>
      setTimeout(
        () =>
          resolve({
            id: getUid(),
            title: 'Promise resolve success',
            type: NOTIFICATION_TYPE.SUCCESS,
            duration: 5,
          }),
        PROMISE_TIMEOUT,
      ),
    )

  promiseNotification(promise())
}

const makePromiseError = () => {
  const promise = () =>
    new Promise<NotificationData>((_, reject) =>
      setTimeout(
        () =>
          reject({
            id: getUid(),
            title: 'Promise reject with error',
            description: 'Unknown error',
            type: NOTIFICATION_TYPE.ERROR,
            duration: 5,
          }),
        PROMISE_TIMEOUT,
      ),
    )

  promiseNotification(promise())
}

export const PromiseExample = () => {
  return (
    <div className="my-6">
      <h2 className="mb-6 text-2xl">Promise</h2>

      <div className="flex gap-3">
        <Button
          size="lg"
          onClick={makePromiseSuccess}
        >
          Promise Success
        </Button>
        <Button
          size="lg"
          onClick={makePromiseError}
        >
          Promise Error
        </Button>
      </div>
    </div>
  )
}
