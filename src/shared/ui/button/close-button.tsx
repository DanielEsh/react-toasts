import { Button } from '@/shared/ui'
import { Icon } from '@/shared/ui/icon/icon.tsx'

interface Props {
  onClose: () => void
}

export const CloseButton = ({ onClose }: Props) => {
  return (
    <Button
      size="sm"
      variant="ghost"
      className="toast-close"
      onClick={onClose}
    >
      <Icon name="close" />
    </Button>
  )
}
