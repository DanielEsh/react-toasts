import { useTranslation } from 'react-i18next'

import {
  NOTIFICATION_TYPE,
  type NotificationData,
  Notification,
} from '@/modules/core/notification'
import { ExampleSection } from '@/pages/home-page/ui/example-section.tsx'
import { Button } from '@/shared/ui'
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
            onUpdate: (notification) => {
              console.log('update [Success]', notification)
            },
          }),
        PROMISE_TIMEOUT,
      ),
    )

  Notification.promise(promise())
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

  Notification.promise(promise())
}

export const PromiseExample = () => {
  const { t } = useTranslation()

  return (
    <ExampleSection title={t('promise')}>
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
    </ExampleSection>
  )
}
