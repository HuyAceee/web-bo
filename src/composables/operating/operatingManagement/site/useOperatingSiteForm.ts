import { alphaBetIDRegex } from '@/common'
import { useLoading } from '@/composables/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { OperatingSiteCategoryDetailRequest } from '@/models/services/requests/operating/site/OperatingSiteCategoryRequest'
import {
  OperatingSiteCategoryDetailModel,
  OperatingSiteFormModel,
  OperatingSiteManagementEmits,
  OptionsSiteForm,
  defaultSiteCategoryFormValue
} from '@/models/views/operating/operatingMangement/OperatingSiteCategoryModel'
import { operatingSiteBoCategoryApi } from '@/services/api/operating/site/OperatingSiteManagementApi'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isDirtyForm } from './useOperatingMenuSite'

export const useOperatingSiteForm = (emits: OperatingSiteManagementEmits) => {
  const { openModal: openModalConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()
  const { openModal: openModalNotification, closeModalByPop } = useModalNotification()
  const { setLoading } = useLoading()
  const route = useRoute()
  const router = useRouter()
  const formValue = ref<OperatingSiteFormModel>(defaultSiteCategoryFormValue())
  const dataDetail = ref<Partial<OperatingSiteCategoryDetailModel> | undefined>()
  const parentDetail = ref<OperatingSiteCategoryDetailModel | undefined>(undefined)

  const handleDirtyForm = (value: boolean) => {
    isDirtyForm.value = value
  }

  const handleChange = <K extends keyof OperatingSiteFormModel>(key: K, value: any): void => {
    if (key === 'subMenuActive' && value === OptionsSiteForm.N && dataDetail.value?.subSiteMenu?.length) {
      closeModalByPop?.()
      openModalConfirm({
        content: '선택을 변경할 경우 하위 메뉴가 모두 비전시 됩니다. 정말로 미사용 처리 하시겠습니까?',
        onConfirm: async () => {
          formValue.value[key] = value
          closeModalConfirm?.()
        }
      })
    } else if (key === 'menuExhibitionStatus' && parentDetail.value && value !== parentDetail.value?.menuExhibitionStatus) {
      closeModalByPop?.()
      openModalNotification({
        content: '상위메뉴 전시 설정 완료 후 추가할 수 있습니다.'
      })
    }
    //  else if (key === 'menuId' && (value.length > 50 || (value.length > 0 && !alphaBetIDRegex.test(value)))) {
    //   openModalNotification({
    //     content: '영어 기준 50자 이내로 입력 해주세요.'
    //   })
    // }
    else {
      handleDirtyForm(true)
      formValue.value[key] = value
    }
  }

  const onValidateMenuID = (content?: string) => {
    const _content = content ?? ''
    return _content.length > 0 && alphaBetIDRegex.test(_content)
  }

  const saveForm = async () => {
    let mes = ''
    if (!formValue.value.menuName || (formValue.value?.menuKey ? false : !formValue.value.menuId)) {
      mes = '( <span class="wf_text-sub-01">*</span> ) 표시는 필수입력항목입니다.'
    } else if (parentDetail.value && formValue.value.menuExhibitionStatus !== parentDetail.value?.menuExhibitionStatus) {
      mes = '상위메뉴 전시 설정 완료 후 추가할 수 있습니다.'
    } else if (formValue.value.checkMenuIdExisted) {
      mes = '사용 가능한 메뉴ID 입니다'
    } else if (!formValue.value?.menuKey && (!formValue.value.menuId || formValue.value.menuId?.length > 50)) {
      mes = '영어 기준 50자 이내로 입력 해주세요.'
    }
    if (mes) {
      openModalNotification({
        content: mes
      })
      return
    }
    try {
      setLoading?.(true)
      const preparedData: OperatingSiteCategoryDetailRequest = {
        exhibitionActive: formValue.value.menuExhibitionStatus,
        menuId: formValue.value.menuId,
        menuName: formValue.value.menuName,
        parentMenuKey: formValue.value.parentMenuKey,
        personalInformationIncluded: formValue.value.personalInformationInclude,
        subMenuActive: formValue.value.subMenuActive
      }

      if (formValue.value.menuKey) {
        delete preparedData.menuId
        await operatingSiteBoCategoryApi.updateSite(formValue.value.menuKey, preparedData)
        getSiteDetaillData(formValue.value.menuKey)
        openModalNotification({
          content: '저장 되었습니다.',
          onAccept: async () => {
            try {
              emits('on-save-site', 'save')
              closeModalByPop?.()
            } catch (error) {
              // empty
            }
          }
        })
      } else {
        const { headers } = await operatingSiteBoCategoryApi.createSite(preparedData)
        const menuKeyReturn: number = headers?.location?.split('/').slice(-1)
        openModalNotification({
          content: '저장 되었습니다.',
          onAccept: async () => {
            emits('on-save-site', 'save')
            router.push({ query: { menuKey: menuKeyReturn } })
            closeModalByPop?.()
          }
        })
      }
    } catch (error) {
      // empty
    } finally {
      setLoading?.(false)
    }
  }

  const handleDeleteSite = async () => {
    if (formValue.value.menuKey) {
      if (dataDetail.value?.subSiteMenu?.length) {
        openModalNotification({
          content: '하위 메뉴가 존재하는 경우 삭제 할 수 없습니다. '
        })
        return
      }
      if (dataDetail.value?.menuExhibitionStatus === OptionsSiteForm.Y) {
        openModalNotification({
          content: '전시 상태에서 삭제할 수 없습니다.'
        })
        return
      }
      try {
        openModalConfirm({
          content: '메뉴를 삭제할 경우 복구할 수 없습니다. 정말로 삭제하시겠습니까?',
          onConfirm: async () => {
            closeModalConfirm?.()
            try {
              formValue.value.menuKey && (await operatingSiteBoCategoryApi.deleteSite(formValue.value.menuKey))
              router.replace({ query: {} })
            } catch (error) {
              //empty
            }
          }
        })
      } catch (error) {
        return
      }
    }
  }

  const checkMenuIdExisteded = async () => {
    if (formValue.value.menuId) {
      const { data } = await operatingSiteBoCategoryApi.checkMenuId(formValue.value.menuId)
      openModalNotification({
        content: data ? '이미 사용중인 메뉴ID 입니다.' : '사용 가능한 메뉴ID 입니다.'
      })
      formValue.value.checkMenuIdExisted = data
      // console.log(json)
    }
  }

  const getSiteDetaillData = async (menuKey: number) => {
    try {
      setLoading?.(true)
      const json = await operatingSiteBoCategoryApi.getSiteDetail(menuKey)
      dataDetail.value = json.data
      if (json.data.parentMenuKey) {
        const json2 = await operatingSiteBoCategoryApi.getSiteDetail(json.data.parentMenuKey)
        parentDetail.value = json2.data
        dataDetail.value.parentMenuName = json2.data.menuName
      }
      formValue.value = {
        menuExhibitionStatus: json.data.menuExhibitionStatus,
        menuKey: json.data.menuKey,
        menuId: json.data.menuId,
        menuName: json.data.menuName,
        personalInformationInclude: json.data.personalInformationInclude,
        subMenuActive: json.data.subMenuActive,
        parentMenuKey: json.data.parentMenuKey,
        checkMenuIdExisted: false
      }
    } catch (error) {
      // empty
    } finally {
      setLoading?.(false)
    }
  }
  const getParentSiteDetaillData = async (parentMenuKey: number) => {
    try {
      setLoading?.(true)
      const json = await operatingSiteBoCategoryApi.getSiteDetail(parentMenuKey)
      parentDetail.value = json.data
      dataDetail.value = { parentMenuKey: parentMenuKey, parentMenuName: json.data.menuName, menuDepth: json.data.menuDepth + 1 }
      formValue.value = {
        ...defaultSiteCategoryFormValue(),
        parentMenuKey: parentMenuKey,
        menuExhibitionStatus: json.data.menuExhibitionStatus,
        personalInformationInclude: json.data.personalInformationInclude,
        subMenuActive: json.data.menuDepth === 2 ? OptionsSiteForm.N : json.data.subMenuActive
      }
      if (parentDetail.value.subMenuActive === OptionsSiteForm.N) {
        openModalNotification({
          content: '하위메뉴 사용 설정 완료 후 추가할 수 있습니다.',
          onAccept: () => {
            router.back()
            closeModalByPop?.()
          }
        })
      }
    } catch (error) {
      // empty
    } finally {
      setLoading?.(false)
    }
  }

  watch(
    () => route.query.menuKey as string,
    async (menuKey) => {
      if (menuKey) {
        parentDetail.value = undefined
        getSiteDetaillData(Number(menuKey))
      } else {
        dataDetail.value = undefined
        parentDetail.value = undefined
        formValue.value = defaultSiteCategoryFormValue()
      }
      handleDirtyForm(false)
    }
  )

  watch(
    () => route.query.parentMenuKey as string,
    async (parentMenuKey) => {
      if (parentMenuKey !== undefined) {
        if (parentMenuKey === '0') {
          dataDetail.value = undefined
          parentDetail.value = undefined
          formValue.value = defaultSiteCategoryFormValue()
        } else {
          getParentSiteDetaillData(Number(parentMenuKey))
        }
        handleDirtyForm(false)
      } else {
        dataDetail.value = undefined
        parentDetail.value = undefined
      }
    }
  )

  onMounted(() => {
    const menuKey = route.query.menuKey as string
    const parentMenuKey = route.query.parentMenuKey as string
    if (menuKey) {
      parentDetail.value = undefined
      getSiteDetaillData(Number(menuKey))
    } else {
      dataDetail.value = undefined
      parentDetail.value = undefined
      formValue.value = defaultSiteCategoryFormValue()
    }
    if (parentMenuKey) {
      if (parentMenuKey === '0') {
        dataDetail.value = undefined
        formValue.value = defaultSiteCategoryFormValue()
      } else {
        getParentSiteDetaillData(Number(parentMenuKey))
      }
    } else {
      parentDetail.value = undefined
    }
    handleDirtyForm(false)
  })

  return { dataDetail, formValue, parentDetail, handleChange, saveForm, handleDeleteSite, checkMenuIdExisteded, onValidateMenuID }
}
