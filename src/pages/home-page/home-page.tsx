import { useTranslation } from 'react-i18next'
import { BaseExample } from '@/pages/home-page/ui/base-example.tsx'
import { PromiseExample } from '@/pages/home-page/ui/promise-example.tsx'
import { HeadlessExample } from '@/pages/home-page/ui/headless-example.tsx'
import { VariantsExample } from '@/pages/home-page/ui/variants-example.tsx'
import { Button } from '@/shared/ui'

export function HomePage() {
  const { t, i18n } = useTranslation()

  const changeLang = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (
    <div className="container">
      <div>{t('title')}</div>

      <Button onClick={changeLang}>Change Lang</Button>

      <BaseExample />

      <VariantsExample />

      <PromiseExample />

      <HeadlessExample />
    </div>
  )
}
