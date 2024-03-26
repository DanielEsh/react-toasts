import { type NotificationRenderFn } from '@/modules/core/notification'
import { Button } from '@/shared/ui'

import { makeHeadlessNotification } from './helpers.ts'

const HeadlessToast: NotificationRenderFn = (data, onRemove) => {
  const handleRemove = () => {
    console.log('dis click')
    onRemove(data)
  }

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
          onClick={handleRemove}
        >
          Reply
        </button>
        <button
          className="flex-1 rounded-br-md border border-gray-100 bg-gray-100 text-neutral-100"
          onClick={handleRemove}
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
