interface Props {
  count: number
}

export const QueueIndicator = ({ count }: Props) => {
  return (
    <div>
      <span>{count}</span>
    </div>
  )
}
