import { type ReactNode, useEffect, useState } from 'react'

interface Props {
  children: ReactNode
  onDelete: () => void
}

export const AnimatedListItem = ({ children, onDelete }: Props) => {
  const [mounted, setMounted] = useState(false)
  const [isDeleting, setDeleting] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDelete = () => {
    setDeleting(true)
    // Добавим задержку перед вызовом onDelete() для завершения анимации
    setTimeout(() => {
      onDelete()
    }, 300)
  }

  return (
    <li
      className={`list-item border border-amber-400 bg-amber-300 p-4 ${
        mounted && !isDeleting ? 'mounted' : ''
      }`}
    >
      {children}
      <button onClick={handleDelete}>Удалить</button>
    </li>
  )
}
