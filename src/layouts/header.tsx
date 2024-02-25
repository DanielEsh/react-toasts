import { BaseButton } from '../shared/ui'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className="h-[64px] ">
      <div className="flex justify-between w-[1600px] mx-auto">
        <div>HEADER</div>

        <div>
          <Link to={'notifications'}>to notifications</Link>
          <BaseButton> Button 1</BaseButton>
          <BaseButton> Button 2</BaseButton>
        </div>
      </div>
    </div>
  )
}
