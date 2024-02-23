import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

export interface UseThemeProps {
  theme?: string
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

const ThemeContext = createContext<UseThemeProps | undefined>(undefined)
const defaultContext: UseThemeProps = { setTheme: () => {} }
export const useTheme = () => useContext(ThemeContext) ?? defaultContext

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const storageKey = 'theme'
  const defaultTheme = 'system'
  const [theme, setTheme] = useState(() => getTheme(storageKey, defaultTheme))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme!)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export function useDarkMode() {}
