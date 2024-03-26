import { useTranslation } from 'react-i18next'
import { HeadlessVariant1 } from '@/pages/home-page/ui/headles/headless-variant-1.tsx'
import { HeadlessVariant2 } from '@/pages/home-page/ui/headles/headless-variant-2.tsx'
import { HeadlessCookie } from '@/pages/home-page/ui/headles/headless-cookie.tsx'
import { ExampleSection } from '@/pages/home-page/ui/example-section.tsx'

export const HeadlessExample = () => {
  const { t } = useTranslation()

  return (
    <ExampleSection title={t('headless')}>
      <div className="flex gap-3">
        <HeadlessVariant1 />
        <HeadlessVariant2 />
        <HeadlessCookie />
      </div>
    </ExampleSection>
  )
}
