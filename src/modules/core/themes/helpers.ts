import { MEDIA } from './constants.ts'
import type { Theme } from './types.ts'

export const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  if (!e) e = window.matchMedia(MEDIA)
  const isDark = e.matches
  return isDark ? 'dark' : 'light'
}

export const getThemeFromLs = (key: string, fallback: string): Theme => {
  let theme
  try {
    theme = localStorage.getItem(key)
  } catch (e) {
    // Unsupported
  }
  return theme ?? fallback
}
