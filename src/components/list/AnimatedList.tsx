import { AnimatedListItem } from './AnimatedListItem.tsx'
import { useState } from 'react'

export const AnimatedList = () => {
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
      <button onClick={addItem}>Добавить элемент</button>
      <ol className="list flex w-[480px] flex-col gap-4">
        {items.map((item, index) => (
          <AnimatedListItem
            key={item}
            onDelete={() => deleteItem(index)}
          >
            number of list: {item}
          </AnimatedListItem>
        ))}
      </ol>
    </div>
  )
}
