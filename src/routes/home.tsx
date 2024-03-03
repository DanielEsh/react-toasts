import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Icon } from '../icon.tsx'
import { Toast } from '../components/toast.tsx'

export default function HomePage() {
  const [animation, setAnimation] = useState(true)

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
        <Link to="/categories">To categories</Link>

        <Icon name="check" />
        <Icon name="diamond" />

        <div className="flex flex-col gap-3 w-[560px]">
          <Toast
            title="default example"
            description="description"
          />

          <Toast
            type="success"
            title="default example"
            description="description"
          />

          <Toast
            type="info"
            title="default example"
            description="description"
          />

          <Toast
            type="warning"
            title="default example"
            description="description"
          />

          <Toast
            type="error"
            title="default example"
            description="description"
          />
        </div>
      </div>
    </div>
  )
}
