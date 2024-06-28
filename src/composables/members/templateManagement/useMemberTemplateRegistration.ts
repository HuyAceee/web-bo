import { ref } from 'vue'
import { WelfareSelectOptionType } from '@/models'
import { MemberTemplateRegistrationValueOptionType } from '@/models/views/members/templateManagement/MemberTemplateRegistrationOptionModel'

export const useMemberTemplateRegistration = () => {
  const valueOptionRef = ref(MemberTemplateRegistrationValueOptionType.noticeTalk)
  const selectOption = ref(null)

  const handleSelectChange = (value: any) => {
    selectOption.value = value
  }

  const options: WelfareSelectOptionType[] = [
    { label: '하위분1', value: '1' },
    { label: '하위분2', value: '2' },
    { label: '하위분3', value: '3' }
  ]

  return {
    options,
    selectOption,
    valueOptionRef,
    handleSelectChange
  }
}
