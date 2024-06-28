import { CheckboxContext } from "primevue/checkbox";

export const getCheckboxPT = (size: 'sm' | 'md' = 'md') => ({
  root: {
    class: ['p-checkbox', { 'p-checkbox-sm': size === 'sm' }]
  },
  input: ({ context }: { context: CheckboxContext }) => ({
    class: ['p-checkbox-box', { 'p-checkbox-box-checked': context.checked, 'p-checkbox-box-disabled': context.disabled }]
  })
})

export const getCheckboxTablePT = () => ({
  checkbox: {
    class: ['p-checkbox p-checkbox-sm'],
  },
  headerCheckbox: {
    class: ['p-checkbox p-checkbox-sm p-checkbox-table-header'],
  },
  
})