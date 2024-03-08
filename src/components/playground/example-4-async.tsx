import { useEffect, useState } from 'react'

export const Example4Async = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('Effect triggered')

    const fetchData = async () => {
      const result = await fetchDataFromApi(count)
      console.log('Data from API:', result)
    }

    fetchData()

    return () => {
      console.log('Cleanup function triggered')
    }
  }, [count])

  const fetchDataFromApi = async (value) => {
    // В реальном коде это был бы запрос к API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Data for ${value}`)
      }, 1000)
    })
  }

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
