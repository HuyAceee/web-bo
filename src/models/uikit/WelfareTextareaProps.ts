import { TextareaProps } from 'primevue/textarea'

export interface WelfareTextareaProps extends /* @vue-ignore */ TextareaProps {
  modelValue?: string
  autoResize?: boolean
  placeholder?: string
  size?: 'small' | undefined
  disabled?: boolean
  readonly?: boolean
  labelTop?: string
  labelLeft?: string
  labelBottomLeft?: string
  labelBottomRight?: string
  maxLength?: number
}

export interface WelfareTextareaEmits {
  (e: 'update:modelValue', value: any): void
  (e: 'keypress', event: KeyboardEvent): void
}

export interface WelfareTextareaExpose {
  addEventListener: (event: string, listener: (event: Event) => void) => void
  removeEventListener: (event: string, listener: (event: Event) => void) => void
}
