/* eslint-disable @typescript-eslint/no-unused-vars */
import { TEXT_MAX_NUMBER_11, emailRegex2, isAnyPropertyEmpty, isEmpty, isEmptyObject, phoneNumberRegex } from '@/common'
import { useLoading } from '@/composables/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { PartnerRegisterEditPersonInChangeRequest } from '@/models/services/requests/partner/partnerManagementDetail/companyInformation/PartnerRegisterEditPersonInChangeRequest'
import { PartnerRegisterEditPersonInChangeModel } from '@/models/services/responses/partner/partnerManagementDetail/companyInformation/PartnerRegisterEditPersonInChangeResponse'
import {
  PartnerCompanyChargerType,
  PartnerDisplayYnModel
} from '@/models/views/partner/partnerManagementDetail/companyInformation/PartnerRegisterEditPersonInChangeModel'
import { partnerListManagementApi } from '@/services/api/partner/PartnerListManagementApi'
import { useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePartnerRegisterEditPersonInChangeModal } from './usePartnerRegisterEditPersonInChangeModal'
import { PartnerRegisterEditPersonInChargeModalProps } from '@/views/partner/PartnerRegisterEditPersonInChargeModal.vue'

export const usePartnerRegisterEditPersonInChangeLogic = (props: PartnerRegisterEditPersonInChargeModalProps) => {
  const chargerKey = props.chargerKey ?? ''
  const route = useRoute()
  const { openModal: openModalConfirm, closeModalByPop: closeModalByPopConfirm } = useModalConfirm()
  const { openModal: openModalNotification, closeModalByPop: closeModalByPopNotification } = useModalNotification()
  const { closeModal } = usePartnerRegisterEditPersonInChangeModal()
  const sellerKey = route.query.id as string
  const { setLoading } = useLoading()
  const isCSType = ref(false)
  const personName = ref()
  const personInChargeDetail = ref<PartnerRegisterEditPersonInChangeModel>({} as PartnerRegisterEditPersonInChangeModel)

  const defaultValue: PartnerRegisterEditPersonInChangeRequest = {
    chargerName: '',
    isMainExposure: PartnerDisplayYnModel.NON_DISPLAY,
    chargerType: '',
    chargerPosition: '',
    chargerPhone: '',
    chargerEmail: ''
  }

  const schema = {
    chargerName: isEmpty,
    isMainExposure: isEmpty,
    chargerType: isEmpty,
    chargerPosition: isEmpty,
    chargerPhone: isEmpty.matches(phoneNumberRegex),
    chargerEmail: isEmpty.matches(emailRegex2)
  }

  const { values, setFieldValue, setValues, errors } = useForm<PartnerRegisterEditPersonInChangeRequest>({
    validationSchema: schema,
    initialValues: defaultValue
  })

  const onGetPersonInChargeDetail = async () => {
    try {
      const { data } = await partnerListManagementApi.getPersonInChargeDetail(sellerKey ?? '', chargerKey ?? '')
      const { auditing, chargerKey: chargerKeyRes, ...others } = data
      setValues(others)
      personInChargeDetail.value = data
      if (data.chargerType === PartnerCompanyChargerType.CS) isCSType.value = true
    } catch (error) {
      /* empty */
    }
  }

  onMounted(() => {
    if (chargerKey) {
      onGetPersonInChargeDetail()
    }
  })

  const handleValidate = () => {
    if (isAnyPropertyEmpty(values)) {
      openModalNotification?.({
        content: '필수 항목을 모두 입력해 주세요.'
      })
      return
    }
    if (values.chargerPhone.length < TEXT_MAX_NUMBER_11 || !phoneNumberRegex.test(values.chargerPhone)) {
      openModalNotification?.({
        content: '<p>휴대폰번호를 다시 확인해 주세요.</p><p>휴대폰번호 형식이 올바르지 않습니다.</p>'
      })
      return
    }
    openModalNotification?.({
      content: '<p>이메일주소를 다시 확인해 주세요.</p><p>이메일주소 형식이 올바르지 않습니다.</p>'
    })
  }

  const onSubmitAndValidate = () => {
    if (!isEmptyObject(errors.value)) {
      handleValidate()
      return
    }
    onSubmit()
  }

  const handleChangeValueValidate = (field: string, value: string) => {
    if (chargerKey && isCSType.value && value !== PartnerCompanyChargerType.CS ) {
      openModalNotification?.({
        content: '<p>배송, CS 직무의 담당자는 삭제할 수 없습니다.</p><p>직무를 다시 확인해 주세요.</p>'
      })
      return
    }
    setFieldValue(field as keyof PartnerRegisterEditPersonInChangeRequest, value)
  }

  const onKeyPressName = (event: KeyboardEvent) => {
    if (chargerKey && isCSType.value) {
      event.preventDefault()
      const inputName = personName.value?.querySelector('input')
      if (!inputName) return
      inputName.blur()
      openModalNotification?.({
        content: '<p>배송, CS 직무의 담당자는 삭제할 수 없습니다.</p><p>직무를 다시 확인해 주세요.</p>',
        onAccept() {
          closeModalByPopNotification?.()
        }
      })
    }
  }

  const handleRegisterPerson = async () => {
    try {
      const { data } = await partnerListManagementApi.registerPersonInCharge(sellerKey, values)
      props.onSave({
        ...values,
        chargerKey: data?.chargerKey as number
      })
      closeModal?.()
    } catch (error) {
      /* empty */
    } finally {
      setLoading?.(false)
    }
  }

  const handleEditPerson = async () => {
    try {
      await partnerListManagementApi.editPersonInCharge(sellerKey, chargerKey ?? '', values)
      props.onSave({
        ...values,
        chargerKey: chargerKey as number
      })
      closeModal?.()
    } catch (error) {
      /* empty */
    } finally {
      setLoading?.(false)
    }
  }

  const onSubmit = () => {
    openModalConfirm?.({
      content: !chargerKey ? '업무담당자를 등록하시겠습니까?' : '변경내용을 저장하시겠습니까?',
      onConfirm: async () => {
        try {
          closeModalByPopConfirm?.()
          setLoading?.(true)
          if (!chargerKey) {
            handleRegisterPerson()
          } else {
            handleEditPerson()
          }
        } catch (error: any) {
          /* empty */
        }
      }
    })
  }
  return {
    values,
    setFieldValue,
    onSubmitAndValidate,
    personInChargeDetail,
    onSubmit,
    handleChangeValueValidate,
    personName,
    onKeyPressName
  }
}
