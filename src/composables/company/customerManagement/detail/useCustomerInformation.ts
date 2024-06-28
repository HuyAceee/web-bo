import { handleDownloadFileBlob } from '@/common/html'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import {
  CompanyCustomerDetailResponse,
  CompanyCustomerMasterResponse
} from '@/models/services/responses/company/companyCustomers/CompanyCustomerDetailResponse'
import {
  CompanyCustomerDetailModel,
  CustomerRegistrationRadioOption,
  OptionsCustomerStatus,
  mappedRequest
} from '@/models/views/company/customerDetail/CompanyCustomerDetailModel'
import { companyCustomerDetailInfoApi } from '@/services/api/company/customerCompanies/CompanyCustomerDetailInfoApi'
import { useForm } from 'vee-validate'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export const useCustomerInformation = () => {
  const route = useRoute()
  const detailData = ref<CompanyCustomerDetailResponse>()
  const masterData = ref<CompanyCustomerMasterResponse>()
  const { openModal: openConfirmModal, closeModalByPop } = useModalConfirm()

  const { openModal: openNotiModal } = useModalNotification()
  const { values, setFieldValue, setValues, handleReset } = useForm<CompanyCustomerDetailModel>()

  const saveForm = async () => {
    openConfirmModal?.({
      content: '변경사항을 저장하시겠습니까?',
      onConfirm: async () => {
        closeModalByPop?.()
        if (!detailData?.value?.customerKey) {
          return
        }
        try {
          await companyCustomerDetailInfoApi.update(detailData?.value?.customerKey, mappedRequest(values))
        } catch {
          /** */
        } finally {
          openNotiModal({
            content: ' 변경사항이 저장되었습니다.'
          })
          getDetailData(detailData?.value?.customerKey)
        }
      }
    })
  }

  const getDetailData = async (customerKey: number) => {
    try {
      const { data } = await companyCustomerDetailInfoApi.getDetail(customerKey)
      detailData.value = data
      setValues(data as any)
      const { data: masterDataRS } = await companyCustomerDetailInfoApi.getDetailMasterInfo(data.customerKey)
      masterData.value = masterDataRS
    } catch {
      /** */
    }
  }

  const getFileIntroduce = async () => {
    if (!detailData.value?.introductionDocumentFileDownloadLink) {
      return
    }
    try {
      const data = await companyCustomerDetailInfoApi.getFileIntroduce(detailData.value?.introductionDocumentFileDownloadLink.split('/').slice(-1)[0])
      handleDownloadFileBlob(data, 'file.pdf')
    } catch {
      /** */
    }
  }

  const getFileRegistration = async () => {
    if (!detailData.value?.bizRegDocumentFileDownloadLink) {
      return
    }
    try {
      const data = await companyCustomerDetailInfoApi.getFileRegistration(detailData.value?.bizRegDocumentFileDownloadLink.split('/').slice(-1)[0])
      handleDownloadFileBlob(data, 'file.pdf')
    } catch {
      /** */
    }
  }

  onMounted(() => {
    const { customerKey } = route.query
    if (customerKey) {
      getDetailData(Number(customerKey))
    }
  })

  watch(
    () => route.query.customerKey,
    async (newId) => {
      if (newId) {
        getDetailData(Number(route.query.customerKey))
      }
    }
  )

  return {
    OptionsCustomerStatus,
    CustomerRegistrationRadioOption,
    detailData,
    masterData,
    values,
    setFieldValue,
    setValues,
    handleReset,
    getFileIntroduce,
    getFileRegistration,
    saveForm
  }
}
