import { FadeTransition } from '@/shared/ui'

interface Props {
  count: number
}

export const NotificationQueueIndicator = ({ count }: Props) => {
  return (
    <FadeTransition>
      <span className="flex h-[56px] w-notification items-center justify-center rounded-lg border border-subtle bg-background p-4 drop-shadow-md">
        уведомлений в очереди: {count}
      </span>
    </FadeTransition>
  )
}
