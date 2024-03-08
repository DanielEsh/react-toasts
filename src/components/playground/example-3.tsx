import { Button } from '@/shared/ui'
import { useEffect, useState } from 'react'

export const Example3 = () => {
  const [state, setState] = useState(0)

  useEffect(() => {
    console.log('Срабатывание на каждый рендер')
  })

  useEffect(() => {
    console.log('Первый рендер')

    return () => {
      console.log('Unmount')
    }
  }, [])

  useEffect(() => {
    console.log('Mount + state change')

    return () => {
      console.log('UnMount + state change')
    }
  }, [state])

  const handleClick = () => {
    console.log('обработчик клика')
    setState(state + 1)
  }

  return (
    <div>
      <span>123</span>
      <Button onClick={handleClick}>Обновить</Button>
    </div>
  )
}
