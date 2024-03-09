import { Link, Outlet } from 'react-router-dom'
import { AnimatedList } from '../components/list/AnimatedList.tsx'
import { AnimatedQueue } from '../components/animated-queue/AnimatedQueue.tsx'
import { DropdownDemo } from '../components/DropdownDemo.tsx'
import { useState } from 'react'

export default function CategoriesPage() {
  const [fade, setFade] = useState(false)

  return (
    <div>
      <h1>Categories</h1>
      <AnimatedList />
      <AnimatedQueue />
      <DropdownDemo />

      <button
        className="button"
        onClick={() => setFade(!fade)}
      >
        frame motion example
      </button>

      <div>
        <Link to="/">Back home</Link>
      </div>
      <div className="h-[2000px]"></div>
      <Outlet />
    </div>
  )
}
