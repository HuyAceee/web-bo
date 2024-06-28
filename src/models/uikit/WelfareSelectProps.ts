import { DropdownProps } from 'primevue/dropdown'

export type WelfareSelectOptionType = {
  label: string
  value: any
}

export interface WelfareSelectProps extends Omit<DropdownProps, 'aria-label' | 'aria-labelledby'> {
  small?: boolean
  bigRadius?: boolean
  labelTop?: string
  labelLeft?: string
  isError?: boolean
  class?: string
  required?: boolean
}

export type WelfareSelectEmits = (e: 'update:modelValue', value: any) => void
