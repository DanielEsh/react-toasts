import {
  createContext,
  ReactNode,
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
