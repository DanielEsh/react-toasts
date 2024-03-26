import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui'
import { ExampleSection } from './example-section.tsx'
import { Notification, NOTIFICATION_TYPE } from '@/modules/core/notification'
import { getUid } from '@/shared/utils'

const makeNotification = ({ type = NOTIFICATION_TYPE.DEFAULT }) => {
  Notification.create({
    id: getUid(),
    type,
    title: `Simple ${type} notification`,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    duration: 5,
  })
}

const makeDefaultNotification = () => {
  makeNotification({
    type: NOTIFICATION_TYPE.DEFAULT,
  })
}

const makeSuccessNotification = () => {
  makeNotification({
    type: NOTIFICATION_TYPE.SUCCESS,
  })
}

const makeInfoNotification = () => {
  makeNotification({
    type: NOTIFICATION_TYPE.INFO,
  })
}

const makeWarningNotification = () => {
  makeNotification({
    type: NOTIFICATION_TYPE.WARNING,
  })
}

const makeErrorNotification = () => {
  makeNotification({
    type: NOTIFICATION_TYPE.ERROR,
  })
}

const makeLoadingNotification = () => {
  makeNotification({
    type: NOTIFICATION_TYPE.LOADING,
  })
}

export const VariantsExample = () => {
  const { t } = useTranslation()

  return (
    <ExampleSection title={t('variants')}>
      <div className="flex gap-3">
        <Button
          size="lg"
          onClick={makeDefaultNotification}
        >
          Default
        </Button>

        <Button
          size="lg"
          onClick={makeSuccessNotification}
        >
          Success
        </Button>

        <Button
          size="lg"
          onClick={makeInfoNotification}
        >
          Info
        </Button>

        <Button
          size="lg"
          onClick={makeWarningNotification}
        >
          Warning
        </Button>

        <Button
          size="lg"
          onClick={makeErrorNotification}
        >
          Error
        </Button>

        <Button
          size="lg"
          onClick={makeLoadingNotification}
        >
          Loading
        </Button>
      </div>
    </ExampleSection>
  )
}
