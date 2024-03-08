import { useState, useEffect } from 'react'

export const Example2 = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('Effect triggered')

    const intervalId = setInterval(() => {
      console.log('Interval function triggered', count)
    }, 1000)

    return () => {
      clearInterval(intervalId)
      console.log('Cleanup function triggered')
    }
  }, [count])

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  )
}
