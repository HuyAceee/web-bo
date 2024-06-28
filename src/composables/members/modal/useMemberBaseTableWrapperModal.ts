import { FORMAT_DATE_YYYY_MM_DD_HH_MM_SS } from '@/common/constant'
import {
  MemberBaseTableWrapperPopupModel,
  memberSelectDeliveryTemplateConfig,
  memberSelectTypeDeliveryConfig
} from '@/models/views/members/deliveryManagement/MemberBaseTableWrapperPopupModel'
import { useForm } from 'vee-validate'
import { ref, watch } from 'vue'
import { object, string } from 'yup'

export const useMemberBaseTableWrapperModal = () => {
  const formatDate = FORMAT_DATE_YYYY_MM_DD_HH_MM_SS
  const checkTypeDeliveryTemplate = ref(true)

  const validSchema = {
    title: string().max(20).required(),
    description: string().max(30).required(),
    selectTypeDelivery: object({
      label: string(),
      value: string()
    }),
    selectDeliveryTemplate: object({
      label: string(),
      value: string()
    })
  }

  const { values, setFieldValue } = useForm<MemberBaseTableWrapperPopupModel>({
    validationSchema: validSchema,
    initialValues: {
      optionDistributeApplications: true,
      optionTypeMessage: true,
      optionMethodShipping: true,
      optionTargetMember: true,
      optionIsUsed: true,
      selectTypeDelivery: memberSelectTypeDeliveryConfig[0].value,
      selectDeliveryTemplate: memberSelectDeliveryTemplateConfig[0].value,
      createdAt: FORMAT_DATE_YYYY_MM_DD_HH_MM_SS,
      createdBy: '관리자명 (회원코드)',
      updatedAt: FORMAT_DATE_YYYY_MM_DD_HH_MM_SS,
      updatedBy: '관리자명 (회원코드)',
      deliveryDate: '',
      selectTypeDeliveryTemplate: true
    }
  })

  watch(
    () => values.selectTypeDeliveryTemplate,
    () => {
      checkTypeDeliveryTemplate.value = !checkTypeDeliveryTemplate.value
    }
  )

  const handleSetFieldValue = (field: any, value: any) => {
    setFieldValue(field, value)
  }

  const onReSetting = () => {}
  const onSaveForm = () => {}
  const onSaveAndSend = () => {}
  const onSaveTemplate = () => {}
  const onRegistrationPhoneRequest = () => {}
  return {
    values,
    handleSetFieldValue,
    onReSetting,
    onSaveForm,
    onSaveAndSend,
    onSaveTemplate,
    onRegistrationPhoneRequest,
    formatDate,
    checkTypeDeliveryTemplate
  }
}
