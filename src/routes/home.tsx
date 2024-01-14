import { Link } from 'react-router-dom'
import { toastFunction } from '../state.ts'
import { Section } from '../components/Section.tsx'
import { TypesActions } from '../components/TypesActions.tsx'

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
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    })
  }

  const handleTimerClick = () => {
    toastFunction('message', {
      duration: 5,
      id: new Date().getTime(),
    })
  }

  console.log('rerender')

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <div className="flex gap-3">
          <button
            className="button"
            onClick={handleClick}
          >
            Add Toast
          </button>
          <button
            className="button"
            onClick={handle2Click}
          >
            Add Large description toast
          </button>
        </div>

        <Section
          title="Types"
          description="description"
        >
          <TypesActions />
        </Section>

        <div className="flex gap-3">
          <button
            className="button"
            onClick={handleTimerClick}
          >
            AutoClose
          </button>
        </div>
        <Link to="/categories">To categories</Link>
      </div>
    </div>
  )
}
