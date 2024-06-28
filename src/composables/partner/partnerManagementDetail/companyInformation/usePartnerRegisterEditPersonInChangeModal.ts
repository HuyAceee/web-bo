import { useModal } from '@/composables'
import { PartnerRegisterEditPersonInChangeRequest } from '@/models/services/requests/partner/partnerManagementDetail/companyInformation/PartnerRegisterEditPersonInChangeRequest'
import PartnerRegisterEditPersonInChargeModal from '@/views/partner/PartnerRegisterEditPersonInChargeModal.vue'

export const usePartnerRegisterEditPersonInChangeModal = () => {
  const modalTable = useModal()
  const onShowModal = (onSave: (data: PartnerRegisterEditPersonInChangeRequest) => void, chargerKey?: string | number) => {
    modalTable.showModal?.({
      component: PartnerRegisterEditPersonInChargeModal,
      props: {
        onCancel: modalTable?.closeModalByPop,
        chargerKey,
        onSave
      },
    })
  }

  return {
    onShowModal,
    closeModal: () => modalTable.closeModalByPop?.()
  }
}
