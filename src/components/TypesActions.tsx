import { toastFunction } from '../state.ts'

export const TypesActions = () => {
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

  return (
    <>
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
        Warning
      </button>
    </>
  )
}
