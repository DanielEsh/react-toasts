import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export interface UseThemeProps {
  theme?: string
  resolvedTheme?: string
  setTheme: any
}

const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  if (!e) e = window.matchMedia(MEDIA)
  const isDark = e.matches
  return isDark ? 'dark' : 'light'
}

const getTheme = (key: string, fallback?: string) => {
  let theme
  try {
    theme = localStorage.getItem(key) || undefined
  } catch (e) {
    // Unsupported
  }
  return theme || fallback
}

const colorSchemes = ['light', 'dark']
const MEDIA = '(prefers-color-scheme: dark)'

const ThemeContext = createContext<UseThemeProps>({
  setTheme: () => {},
})
export const useTheme = () => useContext(ThemeContext)

interface ThemeProviderProps {
  children: ReactNode
  isSystemEnabled?: boolean
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const storageKey = 'theme'
  const defaultTheme = 'system'

  const [theme, setTheme] = useState(() => getTheme(storageKey, defaultTheme))
  const [resolvedTheme, setResolvedTheme] = useState(() => getTheme(storageKey))

  const applyTheme = (theme?: string) => {
    let resolved = theme

    if (resolved === 'system' && props.isSystemEnabled) {
      resolved = getSystemTheme()
    }

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

      if (theme === 'system' && props.isSystemEnabled) {
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
      {props.children}
    </ThemeContext.Provider>
  )
}

export function useDarkMode() {}
