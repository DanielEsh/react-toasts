import { type FormEvent, useRef } from 'react'
import { Button } from '@/shared/ui'

interface Props {
  onSubmit: (value: string) => void
}

export const ListForm = ({ onSubmit }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!inputRef.current) return

    onSubmit(inputRef.current.value)

    inputRef.current.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} />
      <Button type="submit">Add</Button>
    </form>
  )
}
