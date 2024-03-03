import { Button } from '../../../shared/ui'
import {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

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

  return (
    <div>
      <span>HEADLESS EXAMPLE</span>

      <ToastRoot ref={ref} />

      {list.map((item, idx) => {
        return <div key={idx}>{item.name}</div>
      })}

      <Button onClick={handleClick}>Create Headless Toast</Button>
    </div>
  )
}
