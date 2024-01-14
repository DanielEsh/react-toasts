import { ReactNode } from 'react'

interface Props {
  title: string
  description: string
  children: ReactNode
}

export const Section = ({ title, description, children }: Props) => {
  return (
    <section>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="flex gap-3">{children}</div>
    </section>
  )
}
