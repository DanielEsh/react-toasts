import type { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
}

export const ExampleSection = ({ title, children }: Props) => {
  return (
    <div className="my-6">
      <h2 className="mb-6 text-2xl">{title}</h2>

      {children}
    </div>
  )
}
