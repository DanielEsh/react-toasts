import { Button } from '../../../shared/ui'
import {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Icon } from '../../../icon.tsx'

interface ToastRootProps {
  children?: ReactNode
}

export const ToastRoot = forwardRef<HTMLDivElement, ToastRootProps>(
  function ToastRoot(_, forwardedRef) {
    const add = () => {
      console.log('ADD')
    }

    useImperativeHandle(forwardedRef, () => {
      return {
        add,
      }
    })

    return (
      <div ref={forwardedRef}>
        <span>ToastRoot</span>
      </div>
    )
  },
)

interface ListItem {
  name: string
}

export const HeadlessExample = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [list, setList] = useState<ListItem[]>([])

  const handleClick = () => {
    ref.current.add()

    setList((prevState) => {
      return [
        ...prevState,
        {
          name: 'ListItem',
        },
      ]
    })
  }

  const handleRemove = (index: number) => {
    setList((prevState) => {
      return prevState.filter((_, itemIdx) => itemIdx !== index)
    })
  }

  return (
    <div>
      <span>HEADLESS EXAMPLE</span>

      <ToastRoot ref={ref} />

      <Button onClick={handleClick}>Create Headless Toast</Button>

      {list.map((item, idx) => {
        return (
          <div
            key={idx}
            className="flex items-center justify-center rounded-md gap-3 bg-amber-300 w-[200px]"
          >
            <span>{item.name}</span>
            <Button
              size="xs"
              onClick={() => handleRemove(idx)}
            >
              <Icon name="close" />
            </Button>
          </div>
        )
      })}
    </div>
  )
}
