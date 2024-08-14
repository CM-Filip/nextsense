export type Toasts = Array<Toast>
export type Toast = ToastConfig & {
  id: number
}
export type ToastConfig = {
  classname: string
  message: string
  duration?: number
}