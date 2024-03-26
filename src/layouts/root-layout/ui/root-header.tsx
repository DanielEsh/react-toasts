import { ThemeChanger } from '@/modules/core/themes/theme-changer.tsx'
import { LangChanger } from '@/modules/core/i18n'

export const RootHeader = () => {
  return (
    <div className="p-6">
      <div className="container flex items-center justify-between">
        <div className="font-logo text-4xl font-bold">
          HEADLESS NOTIFICATION
        </div>

        <div className="flex gap-3">
          <LangChanger />
          <ThemeChanger />
        </div>
      </div>
    </div>
  )
}
