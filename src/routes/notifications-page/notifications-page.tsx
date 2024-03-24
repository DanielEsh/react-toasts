import { BaseExample } from '@/routes/notifications-page/ui/base-example.tsx'
import { PromiseExample } from '@/routes/notifications-page/ui/promise-example.tsx'
import { HeadlessExample } from '@/routes/notifications-page/ui/headless-example.tsx'

export const NotificationsPage = () => {
  return (
    <div className="container">
      <BaseExample />

      <PromiseExample />

      <HeadlessExample />
    </div>
  )
}
