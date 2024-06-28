import { InputSwitchProps } from "primevue/inputswitch"

export interface WelfareSwitchProps extends Omit<InputSwitchProps, 'aria-label' | 'aria-labelledby'> {
  modelValue?: boolean| undefined
}

export interface WelfareSwitchEmits {
  (e: 'update:modelValue', value:boolean) : void
}