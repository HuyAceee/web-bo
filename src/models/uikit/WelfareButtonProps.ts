export interface WelfareButtonProps {
  label?: string
  disabled?: boolean
  class?: any
}

export interface WelfareMdButtonProps extends WelfareButtonProps {
  buttonType?: 'liner' | 'neutral' | 'cancel' | 'default'
  buttonSize?: 'small' | 'default'
}

export interface WelfareBigButtonProps extends WelfareButtonProps {
  buttonType?: 'neatral' | 'default' | 'cancel'
}

export interface WelfareColorButtonProps extends WelfareButtonProps {
  buttonType?: 'red' | 'green' | 'blue'
  buttonSize?: 'small' | 'default'
}

export interface WelfareBackButtonProps extends /* @vue-ignore */ WelfareButtonProps {
  buttonType?: 'left' | 'right'
  isActive?: boolean
}

/** Emits */

export type WelfareButtonEmits = (e: 'onClick', event?: Event | undefined) => void

export interface WelfareMdButtonEmits extends WelfareButtonEmits {}

export interface WelfareBigButtonEmits extends WelfareButtonEmits {}

export interface WelfareColorButtonEmits extends WelfareButtonEmits {}

export interface WelfareBackButtonEmits extends WelfareButtonEmits {}
