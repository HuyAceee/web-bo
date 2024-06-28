import { PartnerPermissionToSellProductEmits } from "@/components/partner/PartnerPermissionToSellProduct.vue"
import { PartnerPermissionToSellItemModel, emptyPartnerPermissionToSellItem } from "@/models/views/partner/PartnerListModel"
import { ref, watch } from "vue"
import { useModalConfirm } from "../widgets"
import { TEXT_MAX_NUMBER_10, getRandomString } from "@/common"
import { YnOptions } from "@/models"
import { PartnerAttachmentType } from "@/models/views/partner/PartnerSellerContractDetailModel"
import { partnerUploadFileApi } from "@/services/api/partner/PartnerUploadFileApi"


export const usePartnerPermissionToSellProduct = (initValue: PartnerPermissionToSellItemModel[], emits: PartnerPermissionToSellProductEmits) => {

  const permissionOptions = [
    { label: '판매권한 신청하지 않음', value: YnOptions.N },
    { label: '판매권한 신청', value: YnOptions.Y }
  ]

  const selectProductGroupOptions = [
    { label: '건강기능식품 관련', value: PartnerAttachmentType.HEALTH },
    { label: '의료기기 관련', value: PartnerAttachmentType.MEDICAL },
    { label: '전통주 관련', value: PartnerAttachmentType.ALCOHOL },
    { label: '수입식품 관련 (구매대행)', value: PartnerAttachmentType.ABROAD },
    { label: '화장품 관련 (구매대행', value: PartnerAttachmentType.COSMETICS },
  ]

  const { openModal: openModalConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()
  const permissions = ref<PartnerPermissionToSellItemModel[]>(initValue)
  const isDisableAddNew = ref(true)

  const handleSetProductGroup = (index: number, value: any) => {
    const newList = [...permissions.value]
    newList[index] = {
      ...permissions.value[index],
      productGroup: value
    }
    permissions.value = newList
    emits('on-change', permissions.value)
  }

  const handleDelete = (index: number) => {
    openModalConfirm?.({
      content: '이 권한을 삭제하시겠습니까?',
      onConfirm() {
        permissions.value.splice(index, 1)
        emits('on-change', permissions.value)
        closeModalConfirm?.()
      }
    })
  }

  const handleAddNew = () => {
    permissions.value = [...permissions.value, { ...emptyPartnerPermissionToSellItem, id: getRandomString(TEXT_MAX_NUMBER_10) }]
    emits('on-change', permissions.value)
  }

  const getFile = async (index: number, value: any) => {
    const newList = [...permissions.value]
    const response = await partnerUploadFileApi.uploadPermissionFile(value?.file, newList[index].productGroup)
    newList[index].file = { name: value?.file?.name, url: value?.url, size: value?.file?.size, file: value?.file, id: response.data.attachmentId }
    permissions.value = newList
    emits('on-change', permissions.value)
  }

  const onRemoveFile = (index: number) => {
    const newList = [...permissions.value]
    newList[index].file = undefined
    permissions.value = newList
    emits('on-change', permissions.value)
  }

  watch(permissions, (newPermissions) => {
    const lastItem = newPermissions[newPermissions.length - 1]
    isDisableAddNew.value = !lastItem.file || !lastItem.productGroup
  })

  return {
    isDisableAddNew,
    permissionOptions,
    selectProductGroupOptions,
    permissions,
    handleSetProductGroup,
    handleDelete, handleAddNew,
    getFile, onRemoveFile
  }
}
