import { toastFunction } from '../notification/state.ts'

export const TypesActions = () => {
  const handleDefaultClick = () => {
    toastFunction({
      title: 'message',
    })
  }

  const handleSuccessClick = () => {
    toastFunction({
      title: 'message',
      type: 'success',
    })
  }

  const handleInfoClick = () => {
    toastFunction({
      title: 'message',
      type: 'info',
    })
  }

  const handleWarningClick = () => {
    toastFunction({
      title: 'message',
      type: 'warning',
    })
  }

  const handleErrorClick = () => {
    toastFunction({
      title: 'message',
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
        Error
      </button>
    </>
  )
}
