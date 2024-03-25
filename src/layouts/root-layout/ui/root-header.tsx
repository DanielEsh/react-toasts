import { ThemeChanger } from '@/modules/core/themes/theme-changer.tsx'

export const RootHeader = () => {
  return (
    <div className="p-6">
      <div className="container flex items-center justify-between">
        <div className="font-logo text-4xl font-bold">
          HEADLESS NOTIFICATION
        </div>

        <div>
          <ThemeChanger />
        </div>
      </div>
    </div>
  )
}
