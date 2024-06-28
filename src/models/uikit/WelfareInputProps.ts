import { InputNumberInputEvent } from 'primevue/inputnumber'
import { Nullable } from 'primevue/ts-helpers'
import { WelfareTextareaProps } from '@/models/uikit/WelfareTextareaProps'

export interface WelfareBaseInputProps {
  size?: 'small' | 'large'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  labelTop?: string
  labelLeft?: string
  labelBottomLeft?: string
  labelBottomRight?: string
  icon?: any
  maxLength?: number
}

export interface WelfareInputNumberProps extends WelfareBaseInputProps {
  modelValue?: Nullable<number | undefined | null>
  inputId?: string
  useGrouping?: boolean
  min?: number
  max?: number
  customLabelClass?: {
    labelLeft?: string
  }
}

export interface WelfareInputMaskProps extends WelfareBaseInputProps {
  modelValue: string | undefined
  inputId?: string
  mask?: string
  autoClear?: boolean
}

export interface WelfareInputProps extends WelfareBaseInputProps {
  modelValue?: Nullable<string | undefined | null>
  textAlign?: 'left' | 'right'
  inputType?: any
}

export interface WelfareInputExpose {
  addEventListener: (event: string, listener: (event: Event) => void) => void
  removeEventListener: (event: string, listener: (event: Event) => void) => void
}

export interface WelfareInputMaxLengthValidationProps extends WelfareInputProps {
  hiddenWarning?: boolean
  messageWarning?: string
  isNumberInputType?: boolean
  notCountCharacterRegExp?: RegExp
  onValidateContent?: (content?: string, maxLength?: number) => boolean
}

export interface WelfareInputMaxBytesValidationProps extends WelfareInputProps {
  hiddenWarning?: boolean
  messageWarning?: string
  maxBytes?: number
  hiddenLablelTextBytes?: boolean
}

export interface InputValidationMaxLengthProps extends WelfareTextareaProps {
  messageWarning?: string
  hiddenWarning?: boolean
  isNumberInputType?: boolean
  onValidateContent?: (content?: string) => boolean
}

export interface InputValidationMaxBytesProps extends WelfareTextareaProps {
  messageWarning?: string
  hiddenWarning?: boolean
  maxBytes?: number
  hiddenLablelRight?: boolean
  hiddenLablelTextBytes?: boolean
}

export interface WelfareBaseInputEmits {
  (e: 'update:modelValue', value: any): void

  (e: 'clickIconRight', event: Event): void

  (e: 'keypress', event: KeyboardEvent): void

  (e: 'keydown', event: KeyboardEvent): void

  (e: 'focus', event: Event): void
}

export interface WelfareInputEmits {
  (e: 'blur', event: Event): void

  (e: 'update:modelValue', value: any): void

  (e: 'clickIconRight', event: Event): void

  (e: 'keypress', event: KeyboardEvent): void

  (e: 'keydown', event: KeyboardEvent): void

  (e: 'focus', event: Event): void
}

export interface WelfareInputNumberEmits extends WelfareBaseInputEmits {
  (e: 'input', event: InputNumberInputEvent): void

  (e: 'focusText', event: Event): void
}

export interface WelfareInputMaskEmits extends WelfareBaseInputEmits {}

export interface WelfareInputValidationProps extends WelfareInputProps {
  name: string
  invalid?: boolean
}
