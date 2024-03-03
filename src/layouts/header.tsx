import { Button } from '../shared/ui'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className="h-[64px] ">
      <div className="mx-auto flex w-[1600px] justify-between">
        <div>HEADER</div>

        <div>
          <Link to={'notifications'}>to notifications</Link>
          <Button> Button 1</Button>
          <Button> Button 2</Button>
        </div>
      </div>
    </div>
  )
}
