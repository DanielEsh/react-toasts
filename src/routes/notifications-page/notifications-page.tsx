import { BaseExample } from '@/routes/notifications-page/ui/base-example.tsx'
import { PromiseExample } from '@/routes/notifications-page/ui/promise-example.tsx'
import { HeadlessExample } from '@/routes/notifications-page/ui/headless-example.tsx'
import { VariantsExample } from '@/routes/notifications-page/ui/variants-example.tsx'

export const NotificationsPage = () => {
  return (
    <div className="container">
      <BaseExample />

      <VariantsExample />

      <PromiseExample />

      <HeadlessExample />
    </div>
  )
}
