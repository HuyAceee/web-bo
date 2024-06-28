import { RadioButtonProps } from 'primevue/radiobutton'

export const getRadioButtonPT = (size: 'sm' | 'md' = 'md') => ({
  root: {
    class: ['p-radiobutton', { 'p-radiobutton-sm': size === 'sm' }]
  },
  input: ({ props }: { props: RadioButtonProps }) => ({
    class: ['p-radiobutton-box', { 'p-radiobutton-box-checked': props.value === props.modelValue, 'p-radiobutton-box-disabled': props.disabled }]
  })
})
