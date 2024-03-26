import { AppRouter } from '@/app/router/app-router.tsx'
import { ThemeProvider } from '@/modules/core/themes'

const enum Theme {
  light = 'light',
  dark = 'dark',
  system = 'system',
}

export const App = () => {
  return (
    <ThemeProvider themes={[Theme.light, Theme.dark, Theme.system]}>
      <AppRouter />
    </ThemeProvider>
  )
}
