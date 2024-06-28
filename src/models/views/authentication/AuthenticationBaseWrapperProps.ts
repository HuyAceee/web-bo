export interface AuthenticationBaseWrapperProps {
  title: string
  subTitle: string
  reverseTitle?: boolean
  hasContact?: boolean
  contactText?: string
  contactPhone?: string
}

export interface AuthenticationBoxWrapperProps {
  type: 'primary' | 'danger' | undefined
  titleContent?: string
  messageContent?: string
  class?: string
}
