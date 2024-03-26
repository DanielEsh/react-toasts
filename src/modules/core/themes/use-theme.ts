import { useContext } from 'react'

import { ThemeContext } from './theme-context.tsx'

export function useTheme() {
  return (
    useContext(ThemeContext) ?? {
      theme: '',
      resolvedTheme: '',
      setTheme: () => {},
    }
  )
}
