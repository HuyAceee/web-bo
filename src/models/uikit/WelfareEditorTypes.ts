export type WelfareEditorProps = {
  modelValue?: any
  editorStyle?: any
  disabled?: boolean
  placeholder?: string
  readonly?: boolean
}

export type WelfareEditorEmits = (e: 'update:modelValue', value: any) => void
