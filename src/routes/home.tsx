import { Link } from 'react-router-dom'
import { toastFunction } from '../state.ts'
import { Section } from '../components/Section.tsx'
import { TypesActions } from '../components/TypesActions.tsx'
import { useState } from 'react'
import { Icon } from '../icon.tsx'

export default function HomePage() {
  const [animation, setAnimation] = useState(true)
  const handleClick = () => {
    toastFunction({
      title: 'Simple',
    })
  }

  const handle2Click = () => {
    toastFunction({
      id: new Date().getTime(),
      title: 'with description',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    })
  }

  const handleTimerClick = () => {
    toastFunction({
      title: 'message with timer',
      description: '5 second timer',
      duration: 5,
    })
  }

  console.log('rerender')

  const toggleAnimation = () => setAnimation(!animation)

  return (
    <div>
      <h1>Home Page</h1>

      <button
        className="button"
        onClick={toggleAnimation}
      >
        Toggle Animation
      </button>

      <div
        className="anim bg-amber-300 w-[300px] h-[300px] flex items-center justify-center rounded-md"
        data-animation={animation}
      >
        <span>test</span>
      </div>

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

        <Icon name="check" />
        <Icon name="diamond" />
      </div>
    </div>
  )
}
