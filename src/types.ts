export interface ToastType {
  id?: number | string
  type?: 'default' | 'success' | 'info' | 'warning' | 'error'
  title: string
  description?: string
}
