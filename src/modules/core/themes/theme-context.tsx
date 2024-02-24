import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { Theme } from './types.ts'
import { getSystemTheme, getThemeFromLs } from './helpers.ts'
import { MEDIA } from './constants.ts'

export interface UseThemeProps {
  theme: Theme
  resolvedTheme: Theme
  setTheme: Dispatch<SetStateAction<string>>
}

export const ThemeContext = createContext<UseThemeProps | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  themes: Theme[]
  storageKey?: string
  fallbackTheme?: string
}

export const ThemeProvider = ({
  children,
  themes,
  storageKey = 'theme',
  fallbackTheme = 'system',
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState(() =>
    getThemeFromLs(storageKey, fallbackTheme),
  )
  const [resolvedTheme, setResolvedTheme] = useState('')

  const _resolveTheme = (theme: string) => {
    let resolved = theme

    if (resolved === 'system') {
      resolved = getSystemTheme()
      return resolved
    }

    return themes.includes(theme) ? theme : fallbackTheme
  }

  const applyTheme = (theme?: string) => {
    const resolved = _resolveTheme(theme ?? '')

    localStorage.setItem('theme', theme!)
    document.documentElement.dataset.theme = resolved
    setResolvedTheme(resolved)
  }

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      const resolved = getSystemTheme(e)
      setResolvedTheme(resolved)

      if (theme === 'system') {
        applyTheme('system')
      }
    },
    [theme],
  )

  useEffect(() => {
    const media = window.matchMedia(MEDIA)

    media.addEventListener('change', (event) => handleMediaQuery(event))

    return () => media.removeEventListener('change', handleMediaQuery)
  }, [handleMediaQuery])

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) {
        return
      }

      const theme = event.newValue || fallbackTheme
      const resolved = _resolveTheme(theme)
      setTheme(resolved)
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [setTheme])

  const providerValue = useMemo<UseThemeProps>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme],
  )

  return (
    <ThemeContext.Provider value={providerValue}>
      {children}
    </ThemeContext.Provider>
  )
}
