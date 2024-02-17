import { useState } from 'react'
import { useMyTransition, useTransition } from './use-transition.ts'

export const TransitionExample = () => {
  const [unmountOnExit, setUnmountOnExit] = useState(true)

  const [{ status: state, isMounted }, toggle] = useTransition({
    timeout: 500,
  })

  return (
    <div className="basic-example">
      <h1>Basic example</h1>
      <div className="basic-console">
        <div className="basic-state">state: {state}</div>
        <label>
          Unmount after hiding
          <input
            type="checkbox"
            checked={unmountOnExit}
            onChange={(e) => setUnmountOnExit(e.target.checked)}
          />
        </label>
        <button
          className="button"
          onClick={() => toggle()}
        >
          {state === 'entering' || state === 'entered' ? 'Hide' : 'Show'}
        </button>
      </div>
      {isMounted && (
        <div
          className={`basic-transition ${state} bg-amber-300 w-[700px] h-[200px] flex items-center justify-center`}
        >
          React transition state
        </div>
      )}
    </div>
  )

  // const { status, toggle } = useMyTransition({ duration: 500 })
  //
  // const isMounted = true
  //
  // return (
  //   <div className="basic-example">
  //     <h1>Basic example</h1>
  //     <div className="basic-console">
  //       <div className="basic-state">state: {status}</div>
  //       <label>
  //         Unmount after hiding
  //         <input
  //           type="checkbox"
  //           checked={unmountOnExit}
  //           onChange={(e) => setUnmountOnExit(e.target.checked)}
  //         />
  //       </label>
  //       <button
  //         className="button"
  //         onClick={() => toggle(false)}
  //       >
  //         {status === 'entering' || status === 'entered' ? 'Hide' : 'Show'}
  //       </button>
  //     </div>
  //     {isMounted && (
  //       <div
  //         className={`basic-transition ${status} bg-amber-300 w-[700px] h-[200px] flex items-center justify-center`}
  //       >
  //         React transition state
  //       </div>
  //     )}
  //   </div>
  // )
}
