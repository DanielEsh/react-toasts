import { Button } from '@/shared/ui'
import { Icon } from '@/shared/ui/icon/icon.tsx'

import { useTheme } from './index.ts'

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant={theme === 'light' ? 'default' : 'ghost'}
          onClick={() => setTheme('light')}
        >
          <Icon name="sun" />
        </Button>

        <Button
          variant={theme === 'dark' ? 'default' : 'ghost'}
          onClick={() => setTheme('dark')}
        >
          <Icon name="moon-stars" />
        </Button>

        <Button
          variant={theme === 'system' ? 'default' : 'ghost'}
          onClick={() => setTheme('system')}
        >
          <Icon name="monitor" />
        </Button>
      </div>
    </>
  )
}
