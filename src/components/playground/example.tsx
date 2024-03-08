import { Button } from '@/shared/ui'
import { useEffect, useRef, useState } from 'react'

export const Example = () => {
  const [count, setCount] = useState(0)
  const countRef = useRef(count)

  console.log('rerender', count, countRef.current)
  //   useEffect(() => {
  //     setTimeout(() => console.log(count), 3000)
  //   })

  useEffect(() => {
    const cleanup = () => {
      console.log('unmount', countRef.current)
    }

    return cleanup
  }, [])

  useEffect(() => {
    countRef.current = count
  }, [count])

  const handleCount = () => {
    // setCount(count + 1)
    // setCount(count + 1)
    // setCount(count + 1)

    setCount((prevCount) => prevCount + 1)
    setCount((prevCount) => prevCount + 1)
    setCount((prevCount) => prevCount + 1)
  }

  return (
    <div>
      <p>Clicked {count}</p>
      <div>
        <Button onClick={handleCount}>Click me</Button>
      </div>
    </div>
  )
}
