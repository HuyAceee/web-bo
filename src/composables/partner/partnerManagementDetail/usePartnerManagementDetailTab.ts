import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  CompanyChargerTypeEnum,
  PartnerCompanyChargerTableForm,
  PartnerCompanyDetailTabParams
} from '@/models/views/partner/partnerDetail/PartnerDetailModel'
import { useFormFilterTable, useLoading, useModalConfirm, useModalNotification } from '@/composables'
import { partnerDetailApi } from '@/services/api/partner/PartnerDetailApi'
import { handleDownloadFileBlob } from '@/common/html'
import {
  formatDateWithFORMAT_DATE_TIME_YYYY_MM_DD_HH_MM,
  formatDateWithFORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS,
  getBlobErrorMessage,
  phoneDisplayFormatRegex
} from '@/common'
import { YnOptions } from '@/models'
import { partnerCustomerApi } from '@/services/api/partner/PartnerCustomerApi'
import { API_RESPONSE_CODE } from '@/services/api/ApiResponseCode'
import { PartnerCompanyDetailDetailModel } from '@/models/services/responses/partner/PartnerCompanyDetailResponse'
import { PartnerCompanyBankAccountDetailModel } from '@/models/services/responses/partner/PartnerCompanyBankAccountDetailResponse'
import { PartnerCompanyApiKeyModel } from '@/models/services/responses/partner/PartnerCompanyApiKeyResponse'
import { CustomerCompanyAdminsMasterModel } from '@/models/services/responses/partner/PartnerCustomerCompanyAdminMasterResponse'
import { PartnerCompanyCategoryModel } from '@/models/services/responses/partner/PartnerCompanyCategoryResponse'
import { PartnerCompanyPermissionModel } from '@/models/services/responses/partner/PartnerCompanyPermissionResponse'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { PartnerCompanyChargerListRequest } from '@/models/services/requests/partner/PartnerCompanyChargerListRequest'
import { usePartnerRegisterEditPersonInChangeModal } from './companyInformation/usePartnerRegisterEditPersonInChangeModal'

export const usePartnerManagementDetailTab = (props: PartnerCompanyDetailTabParams) => {
  const { sellerKey, clearCheckAll, scrollToTop } = props
  const route = useRoute()
  const { openModal: openModalConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()
  const { onShowModal: openModalPersonInCharge } = usePartnerRegisterEditPersonInChangeModal()
  const { openModal } = useModalNotification()
  const dataDetail = ref<PartnerCompanyDetailDetailModel | undefined>(undefined)
  const bankDetail = ref<PartnerCompanyBankAccountDetailModel | undefined>(undefined)
  const apiKey = ref<PartnerCompanyApiKeyModel>({ apiKey: '', useYn: YnOptions.N })
  const adminMaster = ref<CustomerCompanyAdminsMasterModel | undefined>(undefined)
  const category = ref<PartnerCompanyCategoryModel[]>([])
  const permission = ref<PartnerCompanyPermissionModel | undefined>(undefined)
  const init = ref<boolean>(true)
  const apiKeyInput = ref<string>('')
  const { setLoading } = useLoading()
  const sellerStatus = ref<YnOptions>(YnOptions.N)

  const formatDisplayPhoneNumber = (phoneNumber?: string) => {
    if (!phoneNumber) return ''
    return phoneNumber.replace(phoneDisplayFormatRegex, '$1-$2-$3')
  }
  const fetchData = async () => {
    try {
      const respond = await partnerDetailApi.getPartnerDetail(sellerKey)
      dataDetail.value = {
        ...respond.data,
        auditing: {
          ...respond.data.auditing,
          modifiedDate: respond.data.auditing.modifiedDate
            ? formatDateWithFORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS(respond.data.auditing.modifiedDate)
            : '',
          registeredDate: respond.data.auditing.registeredDate
            ? formatDateWithFORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS(respond.data.auditing.registeredDate)
            : ''
        }
      }
      sellerStatus.value = respond.data.sellerStatus
      const content = document.getElementById('introductionContent')
      if (content) {
        content.innerHTML = respond.data.introductionContent || ''
      }
      setLoading(false)
    } catch (e) {
      /** */
    }
  }

  const getBankDetail = async () => {
    try {
      const respond = await partnerDetailApi.getPartnerBankDetail(sellerKey)
      bankDetail.value = respond.data
    } catch (e) {
      /** */
    }
  }

  const getAdminMaster = async () => {
    try {
      const respond = await partnerCustomerApi.getAdminMasterExists(sellerKey)
      if (respond.data.isExist) {
        const { data } = await partnerCustomerApi.getAdminMaster(sellerKey)
        adminMaster.value = {
          ...data,
          phone: formatDisplayPhoneNumber(data.phone)
        }
      } else {
        // router.push();
      }
    } catch (e) {
      /** */
    }
  }

  onMounted(() => {
    initData()
  })

  watch(route, () => {
    initData()
  })

  const initData = () => {
    if (init.value && !route.query.tab) {
      setLoading(true)
      fetchData()
      getBankDetail()
      getApiKey()
      getAdminMaster()
      getPartnerCategory()
      getPartnerPermission()
      init.value = false
    }
  }

  const onChangeActive = (value: YnOptions) => {
    sellerStatus.value = value
  }

  const handleDownload = (url?: string, fileName?: string) => {
    if (url) {
      partnerDetailApi
        .downloadFile(url)
        .then((r) => {
          if (r) {
            handleDownloadFileBlob(r, fileName)
          }
        })
        .catch((e) => {
          getBlobErrorMessage(e.data).then((error) => {
            if (error) {
              openModal({
                content: error.message ?? ''
              })
            }
          })
        })
    }
  }

  const getChargerList = async (page: number, size: number): Promise<DataTablePaginationResponseModel<PartnerCompanyChargerTableForm>> => {
    try {
      const response = await partnerDetailApi.getPartnerChargerList(sellerKey, {
        pageNum: page + 1,
        rowSize: size
      })
      const data = response.data.map((item, index) => {
        return {
          id: page * size + index + 1,
          chargerEmail: item.chargerEmail,
          chargerName: item.chargerName,
          chargerPhone: formatDisplayPhoneNumber(item.chargerPhone),
          chargerPosition: item.chargerPosition,
          chargerType: item.chargerType,
          chargerKey: item.chargerKey,
          auditing: {
            registerKey: item.auditing.registerKey,
            registerName: item.auditing.registerName,
            registeredDate: item.auditing.registeredDate ? formatDateWithFORMAT_DATE_TIME_YYYY_MM_DD_HH_MM(item.auditing.registeredDate) : '',
            modifierKey: item.auditing.modifierKey,
            modifierName: item.auditing.modifierName,
            modifiedDate: item.auditing.modifiedDate ? formatDateWithFORMAT_DATE_TIME_YYYY_MM_DD_HH_MM(item.auditing.modifiedDate) : ''
          }
        } as PartnerCompanyChargerTableForm
      })
      handleClearChecked()
      scrollToTop?.()
      return Promise.resolve({
        ...response,
        data,
        totalItems: response.page.totalCount
      })
    } catch (e) {
      return Promise.reject(e)
      /** */
    }
  }

  const getApiKey = async () => {
    try {
      const respond = await partnerDetailApi.getApiKey(sellerKey)
      apiKey.value = {
        apiKey: respond.data.apiKey,
        useYn: respond.data.useYn || YnOptions.N
      }
    } catch (e) {
      /** */
    }
  }

  const getPartnerCategory = async () => {
    try {
      const respond = await partnerDetailApi.getPartnerCategory(sellerKey)
      category.value = respond.data
    } catch (e) {
      /** */
    }
  }

  const getPartnerPermission = async () => {
    try {
      const respond = await partnerDetailApi.getPartnerPermission(sellerKey)
      permission.value = respond.data
    } catch (e) {
      /** */
    }
  }

  const copyText = (text: string) => {
    if (!text) return
    navigator.clipboard.writeText(text)
  }

  const onActivateApi = (value: YnOptions) => {
    if (value === YnOptions.Y && !apiKey.value.apiKey) {
      openModal({
        content: '<div>API 사용 설정을 하시려면</div><div>API KEY를 먼저 생성해 주세요.</div>',
        buttonLabel: '확인'
      })
      return
    }
    apiKey.value.useYn = value
  }

  const getName = (name?: string, id?: string) => {
    if (!name) return ''
    return `${name} ${id ? '(' + id + ')' : ''}`
  }

  const { items, isLoading, onPageChange, totalItems, onRowSelected, onSelectAllChange, listChecked, refreshData, clearChecked } = useFormFilterTable<
    PartnerCompanyChargerTableForm,
    PartnerCompanyChargerListRequest
  >({
    // disabledFetchApiFirst: true,
    fetchDataCallback: getChargerList,
    initialValuesForm: {}
  })

  const handleDeleteCharger = () => {
    if (!listChecked.value.length) {
      openModal({
        content: '담당자를 선택해 주세요.',
        buttonLabel: '확인'
      })
      return
    }
    const isException = listChecked.value
      .map((id) => (items.value || [])?.find((charger) => charger.id === Number(id))?.chargerType || '0')
      .some((type) => type === CompanyChargerTypeEnum.SHIPMENT || type === CompanyChargerTypeEnum.CS)
    if (isException) {
      openModal({
        content:
          '<div>배송, CS 직무의 담당자는</div> <div>1명 이상 필수 지정해야 합니다.</div> <div>정보 수정 혹은 담당자 추가 후 삭제해 주세요.</div>',
        buttonLabel: '확인'
      })
      return
    }
    openModalConfirm({
      content: '선택하신 업무담당자를 삭제하시겠습니까?',
      buttonCancelLabel: '취소',
      buttonConfirmLabel: '확인',
      onConfirm: () => {
        onDeleteCharger()
      }
    })
  }

  const onDeleteCharger = async () => {
    partnerDetailApi
      .deletePartnerCharger(sellerKey, getChargerKey())
      .then((r) => {
        if (r.code === API_RESPONSE_CODE.SUCCESS) {
          refreshData()
          handleClearChecked()
          scrollToTop?.()
        }
      })
      .catch(() => {})
      .finally(() => {
        closeModalConfirm?.()
      })
  }

  const handleSaveDataModal = () => {
    scrollToTop?.()
    refreshData()
    handleClearChecked()
  }

  const handleShowModalAddCharger = () => {
    handleClearChecked()
    openModalPersonInCharge(handleSaveDataModal)
  }

  const handleClearChecked = () => {
    clearCheckAll?.()
    clearChecked()
  }

  const handleShowModalEditCharger = () => {
    const selected = getChargerKey()
    if (!selected.length) {
      openModal({
        content: '담당자를 선택해 주세요.',
        buttonLabel: '확인'
      })
      return
    }
    if (listChecked.value.length > 1) {
      openModal({
        content: '담당자는 1명씩만 수정 가능합니다.',
        buttonLabel: '확인'
      })
      return
    }
    const chargerKey = items.value?.find((_) => _.id === Number(listChecked.value?.[0]))?.chargerKey
    openModalPersonInCharge(handleSaveDataModal, chargerKey)
  }

  const getChargerKey = () => {
    return (listChecked.value || [])
      .map((id) => (items.value || [])?.find((charger) => charger.id === Number(id))?.chargerKey || 0)
      .filter((key) => key !== 0)
  }

  const onSave = () => {
    // if (!apiKey.value.apiKey && !apiKeyInput.value) {
    //   openModal({
    //     content: '필수 항목을 기입해 주세요.'
    //   })
    //   return
    // }
    openModalConfirm({
      content: '변경사항을 저장하시겠습니까?',
      buttonCancelLabel: '취소',
      buttonConfirmLabel: '확인',
      onConfirm: () => {
        handleSave()
      }
    })
  }

  const handleSave = () => {
    setLoading(true)
    partnerDetailApi
      .updatePartnerDetail(sellerKey, {
        company: {
          sellerStatus: sellerStatus.value
        }
      })
      .catch(() => {})
      .finally(() => {
        closeModalConfirm?.()
        setLoading(false)
      })
  }

  const onGenApiKey = () => {
    apiKey.value.apiKey = apiKeyInput.value
  }

  const onChangeApiKey = (value: string) => {
    apiKeyInput.value = value
  }

  return {
    dataDetail,
    handleDownload,
    bankDetail,
    items,
    isLoading,
    onPageChange,
    totalItems,
    onRowSelected,
    onSelectAllChange,
    apiKey,
    copyText,
    onActivateApi,
    adminMaster,
    getName,
    handleShowModalEditCharger,
    handleShowModalAddCharger,
    handleDeleteCharger,
    category,
    permission,
    onChangeActive,
    onSave,
    onGenApiKey,
    onChangeApiKey,
    apiKeyInput,
    sellerStatus,
    listChecked
  }
}
