import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FramerAnimatedListItem } from './framer-animated-list-item.tsx'

export const FramerAnimatedList = () => {
  const [items, setItems] = useState([1, 2, 3])

  const addItem = () => {
    setItems([...items, items.length + 1])
  }

  const deleteItem = (index: number) => {
    setItems((prevItems) => {
      const newItems = [...prevItems]
      newItems.splice(index, 1)
      return newItems
    })
  }

  return (
    <div>
      <button
        className="button"
        onClick={addItem}
      >
        Добавить элемент
      </button>
      <ol className="list flex flex-col w-[480px] gap-4">
        <AnimatePresence>
          {items.map((item, index) => (
            <FramerAnimatedListItem
              key={item}
              onDelete={() => deleteItem(index)}
            >
              number of list: {item}
            </FramerAnimatedListItem>
          ))}
        </AnimatePresence>
      </ol>
    </div>
  )
}
