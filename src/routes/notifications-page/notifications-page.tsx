import { TypesExample } from '@/routes/notifications-page/ui/types-example.tsx'
import { BaseExample } from '@/routes/notifications-page/ui/base-example.tsx'
import { PromiseExample } from '@/routes/notifications-page/ui/promise-example.tsx'
import { HeadlessExample2 } from '@/routes/notifications-page/ui/headless-example-2.tsx'

export const NotificationsPage = () => {
  return (
    <div className="container">
      <BaseExample />

      <TypesExample />

      <PromiseExample />

      <HeadlessExample2 />
    </div>
  )
}
