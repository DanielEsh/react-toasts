import { Button, FadeTransition } from '@/shared/ui'
import { createNotification, type NotificationRenderFn } from '@/notification'
import { getUid } from '@/shared/utils'

const HeadlessToast: NotificationRenderFn = (_, onRemove) => {
  const handleMoreInfoClick = () => {
    console.log('undo click')
  }

  const handleDismissClick = () => {
    console.log('dis click')
    onRemove()
  }

  return (
    <FadeTransition className="w-[450px] rounded-lg border border-subtle p-4 drop-shadow-md">
      <div className="mb-4 flex justify-center text-neutral-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="126"
          height="126"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M164.49,163.51a12,12,0,1,1-17,0A12,12,0,0,1,164.49,163.51Zm-81-8a12,12,0,1,0,17,0A12,12,0,0,0,83.51,155.51Zm9-39a12,12,0,1,0-17,0A12,12,0,0,0,92.49,116.49Zm48-1a12,12,0,1,0,0,17A12,12,0,0,0,140.49,115.51ZM232,128A104,104,0,1,1,128,24a8,8,0,0,1,8,8,40,40,0,0,0,40,40,8,8,0,0,1,8,8,40,40,0,0,0,40,40A8,8,0,0,1,232,128Zm-16.31,7.39A56.13,56.13,0,0,1,168.5,87.5a56.13,56.13,0,0,1-47.89-47.19,88,88,0,1,0,95.08,95.08Z"></path>
        </svg>
      </div>
      <p>
        Мы используем cookie что бы сделать этот сайт максимально удобным для
        вас
      </p>

      <div className="mt-4 flex justify-end gap-3">
        <Button
          variant="ghost"
          onClick={handleMoreInfoClick}
        >
          Подробнее
        </Button>
        <Button onClick={handleDismissClick}>Принять</Button>
      </div>
    </FadeTransition>
  )
}

const makeHeadlessNotification = (component: NotificationRenderFn) => {
  createNotification({
    id: getUid(),
    render: component,
  })
}
export const HeadlessCookie = () => {
  return (
    <Button
      size="lg"
      onClick={() => makeHeadlessNotification(HeadlessToast)}
    >
      Cookie example
    </Button>
  )
}
