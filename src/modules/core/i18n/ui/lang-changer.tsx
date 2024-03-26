import { useTranslation } from 'react-i18next'

import { Dropdown, Button } from '@/shared/ui'

import { getSupportedLang, getCurrentLangLabel } from '../constants.ts'
import type { SupportedLang } from '../types.ts'

export const LangChanger = () => {
  const { i18n } = useTranslation()

  const changeCurrentLang = async (lang: SupportedLang) => {
    await i18n.changeLanguage(lang)
  }

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button>{getCurrentLangLabel(i18n.language)}</Button>
      </Dropdown.Trigger>

      <Dropdown.Content>
        {getSupportedLang().map((item) => (
          <Dropdown.Item
            key={item.lang}
            onClick={() => changeCurrentLang(item.lang)}
          >
            <span>{item.label}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  )
}
