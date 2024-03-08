import { Example } from '@/components/playground/example'
import { Example2 } from '@/components/playground/example-2'
import { Example3 } from '@/components/playground/example-3'
import { Example4Async } from '@/components/playground/example-4-async'
import { useToggle } from '@/hooks/use-toggle'
import { Button } from '@/shared/ui'
import { useParams } from 'react-router-dom'

export const CategoriesDetails = () => {
  const { id } = useParams()
  const [state, toggleState] = useToggle(true)

  return (
    <div>
      <div>Categories Details Page by id = {id}</div>
      {/* {state && <Example />} */}

      {/* <Example2 /> */}

      {/* {state && <Example3 />} */}

      <Example4Async />

      <Button onClick={() => toggleState()}>Hide {state.toString()}</Button>
    </div>
  )
}
