import { BaseExample } from '@/pages/home-page/ui/base-example.tsx'
import { PromiseExample } from '@/pages/home-page/ui/promise-example.tsx'
import { HeadlessExample } from '@/pages/home-page/ui/headless-example.tsx'
import { VariantsExample } from '@/pages/home-page/ui/variants-example.tsx'
import { LangChanger } from '@/modules/core/i18n/ui/lang-changer.tsx'

export function HomePage() {
  return (
    <div className="container">
      <LangChanger />

      <BaseExample />

      <VariantsExample />

      <PromiseExample />

      <HeadlessExample />
    </div>
  )
}
