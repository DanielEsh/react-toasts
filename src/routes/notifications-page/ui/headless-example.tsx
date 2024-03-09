import { HeadlessVariant1 } from '@/routes/notifications-page/ui/headles/headless-variant-1.tsx'
import { HeadlessVariant2 } from '@/routes/notifications-page/ui/headles/headless-variant-2.tsx'
import { HeadlessCookie } from '@/routes/notifications-page/ui/headles/headless-cookie.tsx'

export const HeadlessExample = () => {
  return (
    <div className="my-6">
      <h2 className="mb-6 text-2xl">Headless</h2>

      <div className="flex gap-3">
        <HeadlessVariant1 />
        <HeadlessVariant2 />
        <HeadlessCookie />
      </div>
    </div>
  )
}
