import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const isSuccessAuth = true

  return isSuccessAuth ? <>{children}</> : <Navigate to="/login" />
}
