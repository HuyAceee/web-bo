import { useForm } from 'vee-validate'
import {
  exhibitionCornerManagementAreaAddYnOptions,
  ExhibitionCornerManagementDetailCornerRegisterForm,
  ExhibitionCornerManagementDetailsProps
} from '@/models/views/exhibition/modal/ExhibtionCornerManagementDetailsModel'
import { computed, ref, watch } from 'vue'
import { exhibitionCornerManagementDetailApi } from '@/services/api/exhibition/ExhibitionCornerManagementDetailApi'
import { WelfareSelectOptionType } from '@/models'
import { toTypedSchema } from '@vee-validate/yup'
import { object, string } from 'yup'
import {
  ExhibitionCornerManagementGetListCornerResponseModel,
  ExhibitionCornerManagementGetListPavilionCategoryResponseModel
} from '@/models/services/responses/exhibition/modal/ExhibitionCornerManagementDetailResponse'
import { isEmptyObject, renderLabelEnum } from '@/common'
import { useModalConfirm, useModalNotification } from '@/composables'
import { exhibitionTemplateManagementAppChannelOptions } from '@/models/views/exhibition/templateManagement/ExhibitionTemplateManagementModel'
import {
  ExhibitionCornerManagementDetailRegisterCornerListRequest,
  ExhibitionCornerManagementDetailRegisterCornerListRequestConvertor
} from '@/models/services/requests/exhibition/modal/ExhibitionCornerManagementDetailRequest'

export const useExhibitionCornerManagementDetailsModalLogic = (props: ExhibitionCornerManagementDetailsProps) => {
  const defaultImageBg = 'wf_bg-nf-ncc'
  const errorImg = ref<string>()
  const { openModal: openNotificationModal } = useModalNotification()
  const { openModal: openConfirmationModal } = useModalConfirm()
  const listPavilionCategory = ref<ExhibitionCornerManagementGetListPavilionCategoryResponseModel[]>([])
  const initialValue: ExhibitionCornerManagementDetailCornerRegisterForm = {
    areaAddYn: exhibitionCornerManagementAreaAddYnOptions[0].value,
    cornerName: '',
    lclassCode: '',
    sclassCode: '',
    templateKey: 0,
    customerId: ''
  }
  const onErrorImage = () => {
    errorImg.value = defaultImageBg
  }

  const exhibitionHallCategoryOptions = computed((): WelfareSelectOptionType[] => {
    return listPavilionCategory.value.map((it): WelfareSelectOptionType => {
      return {
        label: it?.className ?? '',
        value: it?.lclassCode
      }
    })
  })
  const cornerListTableData = ref<ExhibitionCornerManagementGetListCornerResponseModel[]>()
  const { values, setFieldValue, errors, setValues } = useForm<ExhibitionCornerManagementDetailCornerRegisterForm>({
    validationSchema: toTypedSchema(
      object({
        cornerName: string().required(),
        lclassCode: string().required()
      })
    ),
    initialValues: initialValue
  })

  const getListCorner = (customerId: string) => {
    exhibitionCornerManagementDetailApi
      .getListCorner(customerId)
      .then((res) => {
        cornerListTableData.value = res.data?.sort((a, b) => (a.rowNum ?? 0) - (b.rowNum ?? 0))
        setFieldValue('cornerKey', res.data[0].cornerKey)
      })
      .catch(() => {
        // error
      })
  }

  watch(
    () => values.customerId,
    (newValue) => {
      listPavilionCategory.value = []
      cornerListTableData.value = []
      if (newValue) {
        exhibitionCornerManagementDetailApi
          .getListPavilionCategory(newValue)
          .then((res) => {
            listPavilionCategory.value = res.data
          })
          .catch(() => {
            // error
          })
        getListCorner(newValue)
      }
    }
  )

  const addToCornerList = () => {
    if (isEmptyObject(errors.value)) {
      const addData = listPavilionCategory.value.find((it) => it?.customerId === values.customerId && it?.lclassCode === values.lclassCode)
      cornerListTableData.value?.unshift({
        rowNum: 0,
        customerId: values.customerId,
        classDivision: addData?.classDivision,
        className: addData?.className,
        applyChannelTypeName: renderLabelEnum(exhibitionTemplateManagementAppChannelOptions, props.applyChannelType),
        cornerName: values.cornerName,
        cornerKey: values.cornerKey,
        areaAddYn: values.areaAddYn,
        templateKey: props.templateKey,
        sclassCode: addData?.sclassCode,
        lclassCode: addData?.lclassCode
      })
      setValues({
        lclassCode: '',
        sclassCode: '',
        cornerName: '',
        areaAddYn: exhibitionCornerManagementAreaAddYnOptions[0].value
      })
    } else {
      openNotificationModal({
        content: '필수 입력 값을 입력하세요'
      })
    }
  }

  const onSave = () => {
    const saveData = cornerListTableData.value?.filter((it) => typeof it.areaAddYn !== 'undefined' && typeof it.templateKey !== 'undefined')
    if (saveData && saveData.length > 0) {
      const body: ExhibitionCornerManagementDetailRegisterCornerListRequest = {
        createRequestList: ExhibitionCornerManagementDetailRegisterCornerListRequestConvertor.from(saveData)
      }
      exhibitionCornerManagementDetailApi
        .registerCornerList(body)
        .then(() => {
          if (values.customerId) getListCorner(values.customerId)
          openNotificationModal({ content: '저장 되었습니다.' })
        })
        .catch(() => {})
    } else {
      openNotificationModal({
        content: '필수입력 항목을 입력해주세요.'
      })
    }
  }

  const onClose = () => {
    const formValue = { ...values }
    if (JSON.stringify(formValue) === JSON.stringify(initialValue)) {
      props.onClose?.()
    } else {
      openConfirmationModal({
        content: '입력 내용이 있습니다. 창을 닫으시겠습니까?',
        onConfirm() {
          props.onClose?.()
          props.onClose?.()
        }
      })
    }
  }

  return {
    values,
    setFieldValue,
    exhibitionHallCategoryOptions,
    addToCornerList,
    cornerListTableData,
    onSave,
    onClose,
    defaultImageBg,
    onErrorImage
  }
}
