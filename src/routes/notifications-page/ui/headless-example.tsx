import { Button } from '../../../shared/ui'
import {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Icon } from '../../../icon.tsx'
import { createNotification } from '../../../notification'
import { SlideDown } from '../../../components/framer/slide-down.tsx'

interface ToastRootProps {
  children?: ReactNode
}

interface ToastRootRef {
  add: () => void
}

export const ToastRoot = forwardRef<ToastRootRef, ToastRootProps>(
  function ToastRoot(_, forwardedRef) {
    const customNotification = (toast, onRemove) => {
      const handleClick = () => {
        console.log('CLICK', toast)
        onRemove()
      }

      return (
        <SlideDown>
          <div className="bg-blue-500">
            <span>HEADLESS</span>

            <Button
              size="xs"
              onClick={handleClick}
            >
              <Icon name="close" />
            </Button>
          </div>
        </SlideDown>
      )
    }

    const add = () => {
      console.log('ADD')
      createNotification({
        id: `headless${new Date().getTime()}`,
        duration: 5,
        render: customNotification,
      })
    }

    useImperativeHandle(forwardedRef, () => {
      return {
        add,
      }
    })

    return (
      <div>
        <span>ToastRoot</span>
      </div>
    )
  },
)

interface ListItem {
  name: string
}

export const HeadlessExample = () => {
  const ref = useRef<ToastRootRef>(null)
  const [list, setList] = useState<ListItem[]>([])

  const handleClick = () => {
    if (ref.current) {
      ref.current.add()
    }

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
