import { Link } from 'react-router-dom'
import { ThemeChanger } from '@/modules/core/themes/theme-changer.tsx'

export const RootHeader = () => {
  return (
    <div className="h-[64px]">
      <div className="container flex items-center justify-between">
        <div className="text-4xl font-bold">NOTIFICATION</div>

        <div>
          <Link to={'notifications'}>to notifications</Link>
          <ThemeChanger />
        </div>
      </div>
    </div>
  )
}
