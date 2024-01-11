import { Link } from 'react-router-dom'
import { toastFunction } from '../state.ts'

export default function HomePage() {
  const handleClick = () => {
    toastFunction('message', {
      id: new Date().getTime(),
      description: 'desc',
    })
  }

  const handle2Click = () => {
      toastFunction('message', {
          id: new Date().getTime(),
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      })
  }

  console.log('rerender')

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <button className="button" onClick={handleClick}>Add Toast</button>
        <button className="button" onClick={handle2Click}>Add Large description toast</button>
        <Link to="/categories">To categories</Link>
      </div>
    </div>
  )
}
