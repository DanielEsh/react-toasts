import { useTheme } from './use-dark-mode.tsx'

export const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <div className="flex gap-3">
        <button
          className="button"
          onClick={() => setTheme('dark')}
        >
          dark
        </button>
        <button
          className="button"
          onClick={() => setTheme('light')}
        >
          light
        </button>
        <button
          className="button"
          onClick={() => setTheme('system')}
        >
          system
        </button>
      </div>

      <div>current: {theme}</div>
    </>
  )
}
