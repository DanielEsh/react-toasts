import { type NotificationRenderFn } from '@/modules/core/notification'
import { Button, SlideDownTransition } from '@/shared/ui'
import { Icon } from '@/shared/ui/icon/icon.tsx'

import { makeHeadlessNotification } from './helpers.ts'

const HeadlessToast: NotificationRenderFn = (data, onRemove) => {
  const handleUndoClick = () => {
    console.log('undo click')
  }

  const handleDismissClick = () => {
    console.log('dis click')
    onRemove(data)
  }

  return (
    <SlideDownTransition>
      <div className="flex w-[384px] rounded-lg border border-subtle p-4 drop-shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
          ></path>
        </svg>
        <div className="ml-3 flex flex-1 flex-col gap-2">
          <p>Discussion moved</p>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing <br /> elit
            oluptatum tenetur.
          </div>
          <div className="flex gap-3">
            <Button
              size="sm"
              onClick={handleUndoClick}
            >
              Undo
            </Button>
            <Button
              size="sm"
              onClick={handleDismissClick}
            >
              Dismiss
            </Button>
          </div>
        </div>

        <button
          className="toast-close"
          onClick={handleDismissClick}
        >
          <Icon name="close" />
        </button>
      </div>
    </SlideDownTransition>
  )
}

export const HeadlessVariant1 = () => {
  return (
    <Button
      size="lg"
      onClick={() => makeHeadlessNotification(HeadlessToast)}
    >
      Custom render with transition
    </Button>
  )
}
