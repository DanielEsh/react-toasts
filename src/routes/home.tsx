import { Link } from 'react-router-dom'
import { toastFunction } from '../state.ts'

export default function HomePage() {
  const handleClick = () => {
    toastFunction('message', {
      id: new Date().getTime(),
      description: 'desc',
    })
  }

  const handle2Click = () => {
    toastFunction('message', {
      id: new Date().getTime(),
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    })
  }

  const handleDefaultClick = () => {
    toastFunction('message', {
      id: new Date().getTime(),
    })
  }

  const handleSuccessClick = () => {
    toastFunction('message', {
      id: new Date().getTime(),
      type: 'success',
    })
  }

  const handleInfoClick = () => {
    toastFunction('message', {
      id: new Date().getTime(),
      type: 'info',
    })
  }

  const handleWarningClick = () => {
    toastFunction('message', {
      id: new Date().getTime(),
      type: 'warning',
    })
  }

  const handleErrorClick = () => {
    toastFunction('message', {
      id: new Date().getTime(),
      type: 'error',
    })
  }

  const handleTimerClick = () => {
    toastFunction('message', {
      duration: 5,
      id: new Date().getTime(),
    })
  }

  console.log('rerender')

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <div className="flex gap-3">
          <button
            className="button"
            onClick={handleClick}
          >
            Add Toast
          </button>
          <button
            className="button"
            onClick={handle2Click}
          >
            Add Large description toast
          </button>
        </div>
        <div className="flex gap-3">
          <button
            className="button"
            onClick={handleDefaultClick}
          >
            Default
          </button>
          <button
            className="button"
            onClick={handleSuccessClick}
          >
            Success
          </button>
          <button
            className="button"
            onClick={handleInfoClick}
          >
            Info
          </button>
          <button
            className="button"
            onClick={handleWarningClick}
          >
            Warning
          </button>
          <button
            className="button"
            onClick={handleErrorClick}
          >
            Error
          </button>
        </div>
        <div className="flex gap-3">
          <button
            className="button"
            onClick={handleTimerClick}
          >
            AutoClose
          </button>
        </div>
        <Link to="/categories">To categories</Link>
      </div>
    </div>
  )
}
