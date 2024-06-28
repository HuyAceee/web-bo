import { useModalNotification } from '@/composables'
import { GenericOptionType, YnOptions } from '@/models'
import {
  ExhibitionConnectionFormBasicInfoModel,
  ExhibitionConnectionFormBasicInfoProps,
  ExhibitionFormType,
  ExhibitionSellerSpecialConnectionMngtAllFormPopupModel,
  ExhibitionStatusType
} from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionMngtModel'
import { useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { object, string } from 'yup'
import { ExhibitionType } from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialConnectionFormBasicInfoModel'
import { compareDateWithCurrentDate, DEFAULT_DATE_FORMAT_DOT, FORMAT_DATE_YYYYMMDD, formatTime } from '@/common'
import { useValidateTimeRange } from '@/composables/widgets/dateTimePicker/useValidateTimeRange'

export const useExhibitionConnectionFormBasicInfo = (
  props: ExhibitionConnectionFormBasicInfoProps<ExhibitionSellerSpecialConnectionMngtAllFormPopupModel>
) => {
  const exhibitionCategoryOptions: GenericOptionType<string>[] = [
    {
      label: '쇼핑',
      value: ExhibitionType.SHOP
    },
    {
      label: '테마샵',
      value: ExhibitionType.THEME
    }
  ]

  const exhibitionStatusOptions: GenericOptionType<ExhibitionStatusType>[] = [
    {
      label: '전시예정',
      value: ExhibitionStatusType.EXPECT
    },
    {
      label: '전시중',
      value: ExhibitionStatusType.ON
    },
    {
      label: '강제종료',
      value: ExhibitionStatusType.TERMINATE
    },
    {
      label: '기간종료',
      value: ExhibitionStatusType.END
    }
  ]

  const exhibitionDisplayOptions: GenericOptionType<YnOptions>[] = [
    {
      label: '전시',
      value: YnOptions.Y
    },
    {
      label: '비전시',
      value: YnOptions.N
    }
  ]

  const exposurePeriodOptions: GenericOptionType<YnOptions>[] = [
    {
      label: '전시',
      value: YnOptions.Y
    },
    {
      label: '비전시',
      value: YnOptions.N
    }
  ]

  const flatformOptions: GenericOptionType<'applyChannelAllYn' | 'applyChannelPcYn' | 'applyChannelMobileYn' | 'applyChannelMobileWebYn'>[] = [
    {
      label: '전체',
      value: 'applyChannelAllYn'
    },
    {
      label: 'PC',
      value: 'applyChannelPcYn'
    },
    {
      label: '모바일',
      value: 'applyChannelMobileYn'
    },
    {
      label: '모바일-웹',
      value: 'applyChannelMobileWebYn'
    }
  ]

  const exhibitionFormTypeOptions: GenericOptionType<ExhibitionFormType>[] = [
    {
      label: '탭 가로형',
      value: ExhibitionFormType.TAB
    },
    {
      label: '드롭다운 메뉴형',
      value: ExhibitionFormType.DROPDOWN
    },
    {
      label: '버튼형',
      value: ExhibitionFormType.BUTTON
    }
  ]

  const { openModal: openNotification } = useModalNotification()

  const dateRangeStart: string = formatTime(new Date(), DEFAULT_DATE_FORMAT_DOT)

  const defaultValue: ExhibitionConnectionFormBasicInfoModel = {
    exhibitionKey: '',
    sellerKey: '',
    exhibitionType: '',
    exhibitionStatusType: ExhibitionStatusType.EXPECT,
    exhibitionName: '',
    exhibitionContents: '',
    keywordCreateRequestList: [],
    chargeMdCode: '',
    displayYn: YnOptions.Y,
    exhibitionPeriodUseYn: YnOptions.Y,
    applyChannelAllYn: YnOptions.Y,
    applyChannelPcYn: YnOptions.N,
    applyChannelMobileYn: YnOptions.N,
    applyChannelMobileWebYn: YnOptions.N,
    exhibitionFormType: ExhibitionFormType.TAB,
    exhibitionFormAllYn: YnOptions.Y,
    terminateReasonContents: '',
    displayStartDate: '',
    displayStartTime: '',
    displayEndDate: '',
    displayEndTime: '',
    createdByName: '',
    createdDate: '',
    lastModifiedByName: '',
    lastModifiedDate: ''
  }

  const schema = object()
    .shape({
      sellerKey: string().required(),
      exhibitionType: string().required(),
      exhibitionStatusType: string(),
      exhibitionName: string().required(),
      displayYn: string().required(),
      exhibitionPeriodUseYn: string().required(),
      applyChannelAllYn: string(),
      applyChannelPcYn: string(),
      applyChannelMobileYn: string(),
      applyChannelMobileWebYn: string(),
      terminateReasonContents: string().required(),
      exhibitionFormAllYn: string().required(),
      chargeMdCode: string().required()
    })
    .test('applyChannel', '1개 이상 필수 체크해주세요.', (values) => {
      const { applyChannelAllYn, applyChannelPcYn, applyChannelMobileYn, applyChannelMobileWebYn } = values
      return Boolean(
        applyChannelAllYn === YnOptions.Y ||
          applyChannelPcYn === YnOptions.Y ||
          applyChannelMobileYn === YnOptions.Y ||
          applyChannelMobileWebYn === YnOptions.Y
      )
    })
    .test('terminateReasonContents', '필수 입력 항목을 입력해주세요.', (values) => {
      const { exhibitionStatusType, terminateReasonContents } = values
      if (exhibitionStatusType === ExhibitionStatusType.TERMINATE) {
        return Boolean(terminateReasonContents)
      }
      return true
    })

  const keyWordInput = ref<string>()
  const { values, setFieldValue, setValues, handleReset, validate } = useForm<ExhibitionConnectionFormBasicInfoModel>({
    initialValues: defaultValue,
    validationSchema: schema
  })

  watch(
    () => props.data,
    (data) => {
      if (data?.exhibitionKey) {
        const newData: any = {}
        const keys = Object.keys(defaultValue)
        keys.forEach((key) => {
          newData[key] = data[key as keyof ExhibitionSellerSpecialConnectionMngtAllFormPopupModel]
        })
        setValues(newData)
      }
    }
  )

  const onSubmit = async () => {
    const { errors, valid } = await validate()

    if (valid) {
      return {
        data: {
          ...values,
          displayStartTime: values.displayStartTime.replace(':', ''),
          displayEndTime: values.displayEndTime.replace(':', ''),
          displayStartDate: formatTime(values.displayStartDate, FORMAT_DATE_YYYYMMDD),
          displayEndDate: formatTime(values.displayEndDate, FORMAT_DATE_YYYYMMDD)
        },
        isValid: valid
      }
    } else {
      const firstErrorKey = Object.keys(errors)[0]
      if (firstErrorKey === '') {
        //@ts-ignore
        openNotification({ content: errors[firstErrorKey] })
      } else {
        openNotification({ content: '필수 입력 항목을 입력해주세요.' })
      }
      return { data: {}, isValid: valid }
    }
  }

  const onRegisKeyword = () => {
    if ((values.keywordCreateRequestList?.length ?? 0) >= 10) {
      openNotification({ content: '키워드는 10개까지 등록 가능합니다.' })
      return
    }
    if (keyWordInput.value) {
      setFieldValue('keywordCreateRequestList', [...(values.keywordCreateRequestList ?? []), { keywordName: keyWordInput.value }])
      keyWordInput.value = ''
    }
  }

  const onDeleteKeyword = (index: number) => {
    setFieldValue(
      'keywordCreateRequestList',
      [...(values.keywordCreateRequestList ?? [])].filter((_, i) => i !== index)
    )
  }

  const isDisabledTime = computed(() => {
    return {
      startDate: compareDateWithCurrentDate(`${values?.displayStartDate} ${values?.displayStartTime}`),
      endDate: compareDateWithCurrentDate(`${values?.displayEndDate} ${values?.displayEndTime}`)
    }
  })

  const { validateTime } = useValidateTimeRange({ setFieldValue })

  return {
    exhibitionStatusOptions,
    exhibitionDisplayOptions,
    exposurePeriodOptions,
    flatformOptions,
    exhibitionFormTypeOptions,
    keyWordInput,
    values,
    setFieldValue,
    onRegisKeyword,
    onDeleteKeyword,
    onSubmit,
    handleReset,
    exhibitionCategoryOptions,
    dateRangeStart,
    isDisabledTime,
    validateTime
  }
}
