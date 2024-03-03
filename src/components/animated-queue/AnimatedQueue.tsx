import { AnimatedListItem } from '../list/AnimatedListItem.tsx'
import { useQueue } from '../../use-queue.ts' // Update the path as needed

function generateId() {
  return Date.now()
}

interface ListedElement {
  id: number
  name: string
}

export const AnimatedQueue = () => {
  const {
    state: items,
    queue,
    add: addItem,
    update: updateItems,
    cleanQueue,
  } = useQueue<ListedElement>({
    initialValues: [
      { id: 1, name: 'name1' },
      { id: 2, name: 'name2' },
    ],
    limit: 3, // Adjust the limit as needed
  })

  const handleAddItem = () => {
    addItem({
      id: generateId(),
      name: 'new element',
    })
  }

  const deleteItem = (index: number) => {
    updateItems((prevItems) => {
      const newItems = [...prevItems]
      newItems.splice(index, 1)
      return newItems
    })
  }

  return (
    <div>
      <button onClick={handleAddItem}>Добавить элемент</button>
      <button onClick={cleanQueue}>Очистить очередь</button>
      <ol className="list flex w-[480px] flex-col gap-4">
        {items.map((item, index) => (
          <AnimatedListItem
            key={item.id}
            onDelete={() => deleteItem(index)}
          >
            number of list: {item.name}
          </AnimatedListItem>
        ))}
        <div>В очереди: {queue.length}</div>
      </ol>
    </div>
  )
}
