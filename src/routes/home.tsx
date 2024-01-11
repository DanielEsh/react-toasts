import { Link } from 'react-router-dom'
import { toastFunction } from '../state.ts'

export default function HomePage() {
  const handleClick = () => {
    toastFunction('message', {
      id: new Date().getTime(),
      description: 'desc',
    })
  }

  console.log('rerender')

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <button onClick={handleClick}>Add Toast</button>

        <Link to="/categories">To categories</Link>
      </div>
    </div>
  )
}
