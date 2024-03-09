import { Link } from 'react-router-dom'
import { ThemeChanger } from '@/modules/core/themes/theme-changer.tsx'

export const Header = () => {
  return (
    <div className="h-[64px]">
      <div className="container flex justify-between">
        <div>HEADER</div>

        <div>
          <Link to={'notifications'}>to notifications</Link>
          <ThemeChanger />
        </div>
      </div>
    </div>
  )
}
