import { Button } from '@/shared/ui'
import { type NotificationRenderFn } from '@/notification'
import { makeHeadlessNotification } from './helpers.ts'

const HeadlessToast: NotificationRenderFn = (_, onRemove) => {
  return (
    <div className="flex w-[434px] rounded-lg border border-subtle drop-shadow-md">
      <div className="flex flex-col gap-2 p-4">
        <p>Receive notifications</p>
        <p>
          Notifications may include alerts, sounds, <br />
          and badges.
        </p>
      </div>

      <div className="flex flex-col border-l border-subtle">
        <button
          className="flex-1 border-b border-subtle px-8"
          onClick={onRemove}
        >
          Reply
        </button>
        <button
          className="flex-1 rounded-br-md border border-gray-100 bg-gray-100 text-neutral-100"
          onClick={onRemove}
        >
          {"Don't allow"}
        </button>
      </div>
    </div>
  )
}

export const HeadlessVariant2 = () => {
  return (
    <Button
      size="lg"
      onClick={() => makeHeadlessNotification(HeadlessToast)}
    >
      Custom render without transition
    </Button>
  )
}
