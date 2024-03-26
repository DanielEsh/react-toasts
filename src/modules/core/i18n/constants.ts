import { i18n } from '@/plugins/i18n.ts'

import type { Lang } from './types.ts'

const { t } = i18n

export const getCurrentLangLabel = (key: string) => {
  const langMap: { [key: string]: string } = {
    ru: t('lang.ru'),
    en: t('lang.en'),
  }

  return langMap[key]
}

export const getSupportedLang = (): Lang[] => {
  return [
    {
      label: t('lang.ru'),
      lang: 'ru',
    },
    {
      label: t('lang.en'),
      lang: 'en',
    },
  ]
}
