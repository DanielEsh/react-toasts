import { BaseExample } from '@/pages/home-page/ui/base-example.tsx'
import { PromiseExample } from '@/pages/home-page/ui/promise-example.tsx'
import { HeadlessExample } from '@/pages/home-page/ui/headless-example.tsx'
import { VariantsExample } from '@/pages/home-page/ui/variants-example.tsx'

export function HomePage() {
  return (
    <div className="container">
      <BaseExample />

      <VariantsExample />

      <PromiseExample />

      <HeadlessExample />
    </div>
  )
}
