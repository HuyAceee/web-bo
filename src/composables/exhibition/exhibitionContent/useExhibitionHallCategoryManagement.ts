import { isEmpty } from '@/common/validation/validationRules'
import { useLoading } from '@/composables/common'
import { useModalConfirm } from '@/composables/widgets/modal/useModalConfirm'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import { ExhibitionHallCategoryDeleteDataLowerModelRequest, ExhibitionHallCategoryRegisLowerListModelRequest } from '@/models/services/requests/exhibition/ExhibitionHallCategoryModelRequest'
import { ExhibitionContentHallCategoryLowerDetail, ExhibitionContentHallCategoryLowerFormItemModel, ExhibitionContentHallCategoryLowerListItem, ExhibitionContentHallCategoryUpperDetail, ExhibitionContentHallCategoryUpperListItem } from '@/models/views/exhibition/exhibitionContent/ExhibitionContentHallCategoryModel'
import { exhibitionHallCategoryApi } from '@/services/api/exhibition/ExhibitionHallCategoryApi'
import { TreeNode } from 'primevue/tree'
import { useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useExhibitionHallCategoryManagement = () => {
  const categoryDetailFormSchema = {
    sclassUseYn: isEmpty,
    displayYn: isEmpty
  }

  const TREE_DEPTH_0 = 0
  const TREE_DEPTH_1 = 1
  const TREE_DEPTH_2 = 2

  const defaultHallCategoryTree: TreeNode[] = [
    {
      label: '공통',
      key: '공통',
      data: {},
      depth: TREE_DEPTH_0,
      children: []
    }
  ]

  const { openModal: openConfirm, closeModalByPop } = useModalConfirm()
  const { openModal: openNotification } = useModalNotification()
  const { setLoading } = useLoading()
  const router = useRouter()
  const route = useRoute()

  const customerSearchRef = ref()
  const customerData = ref()
  const exhibitionHallCategoryList = ref<ExhibitionContentHallCategoryUpperListItem[]>([])
  const exhibitionHallCategoryDetail = ref<ExhibitionContentHallCategoryUpperDetail>({})
  const exhibitionSubHallCategoryRegistered = ref<ExhibitionContentHallCategoryLowerListItem[]>([])
  const exhibitionSubHallCategoryDetail = ref<ExhibitionContentHallCategoryLowerDetail>({})

  const exhibitionHallCategoryTreeComputed = computed(() => {
    if (exhibitionHallCategoryList.value?.length) {
      const treeDepth0Label = Array.from(new Set(exhibitionHallCategoryList.value.map(it => it?.applyChannelTypeName)))
      const treeDepth0Filter = treeDepth0Label.reduce((acc, cur) => {
        return [...acc, exhibitionHallCategoryList.value.filter((it) => it.applyChannelTypeName === cur)]
      }, [] as ExhibitionContentHallCategoryUpperListItem[][])

      const tree: TreeNode[] = treeDepth0Label.reduce((acc, cur, idx) => {

        const depth1Code = Array.from(new Set(treeDepth0Filter[idx].filter((it) => it.applyChannelTypeName === cur).map(it => it.lclassCode)))
        const depth1Filter = depth1Code.reduce((_acc, _cur) => {
          return [..._acc, treeDepth0Filter[idx].filter((it) => it.lclassCode === _cur)]
        }, [] as ExhibitionContentHallCategoryUpperListItem[][])

        const depth1Items = depth1Code.reduce((_acc, _cur, _idx) => {

          const depth2Filter = depth1Filter[_idx].filter((it) => it?.lclassCode === _cur)
          const depth1Data = depth2Filter.find((it) => Number(it?.sclassCode) === 0)

          const depth2Items = depth2Filter.filter((it) => Number(it?.sclassCode ?? 0) > 0).map((it: any) => ({
            label: it?.sclassName,
            key: it?.sclassCode,
            data: { ...it },
            depth: TREE_DEPTH_2,
            children: []
          }))

          return [..._acc, { label: depth2Filter?.[0]?.lclassName, key: _cur, depth: TREE_DEPTH_1, data: { ...depth1Data }, children: depth2Items }]
        }, [] as TreeNode[])

        return [...acc, { label: cur, key: cur, depth: TREE_DEPTH_0, children: depth1Items }]
      }, [] as TreeNode[])
      return tree
    } else return defaultHallCategoryTree
  })

  const {
    values: categoryDetailFormValues,
    setFieldValue: setCategoryDetailFormFieldValue,
    resetForm: resetCategoryDetailForm,
    handleSubmit: handleSubmitCategoryDetailForm
  } = useForm<ExhibitionContentHallCategoryUpperDetail>({ validationSchema: categoryDetailFormSchema })

  const onSelectTreeItem = (event: TreeNode) => {
    const { depth, data } = event
    if (depth === TREE_DEPTH_1) {
      router.push({ query: { lclassCode: data?.lclassCode } })
    }
    if (depth === TREE_DEPTH_2) {
      router.push({ query: { lclassCode: data?.lclassCode, sclassCode: data?.sclassCode } })
    }
  }

  const getHallCategoryList = async () => {
    setLoading(true)
    exhibitionHallCategoryApi.getUpperList(
      customerData.value?.customerKey
    ).then((res) => {
      exhibitionHallCategoryList.value = res.data
    }).catch(() => {
    }).finally(() => {
      setLoading(false)
    })
  }

  watch(customerData, (v) => {
    if (v?.customerKey) {
      getHallCategoryList()
    }
  })

  const getDetailHallCategory = async (lclassCode?: string) => {
    if (lclassCode && customerData.value?.customerKey) {
      setLoading(true)
      exhibitionHallCategoryApi.getUpperDetail({
        customerId: customerData.value?.customerKey,
        lclassCode: lclassCode
      }).then((res) => {
        exhibitionHallCategoryDetail.value = res.data
        resetCategoryDetailForm({ values: res.data })
      }).catch(() => {
      }).finally(() => {
        setLoading(false)
      })
    }
  }

  watch([() => route.query?.lclassCode, () => customerData.value?.customerKey], ([v]) => {
    getDetailHallCategory(v as string)
  })

  const getSubHallCategoryList = async () => {
    if (customerData.value?.customerKey
      && route.query?.lclassCode) {
      setLoading(true)
      exhibitionHallCategoryApi.getLowerList({
        customerId: customerData.value?.customerKey,
        lclassCode: route.query?.lclassCode as string,
      }).then((res) => {
        exhibitionSubHallCategoryRegistered.value = res.data
      }).catch(() => { })
        .finally(() => {
          setLoading(false)
        })
    } else {
      exhibitionSubHallCategoryRegistered.value = []
    }
  }

  watch([() => customerData.value?.customerKey, () => route.query?.lclassCode], () => {
    getSubHallCategoryList()
  })

  const getDetailSubHallCategory = async (sclassCode?: string) => {
    if (sclassCode && route.query?.lclassCode && customerData.value?.customerKey) {
      setLoading(true)
      exhibitionHallCategoryApi.getLowerDetail({
        customerId: customerData.value?.customerKey,
        lclassCode: route.query?.lclassCode as string,
        sclassCode: sclassCode
      }).then((res) => {
        exhibitionSubHallCategoryDetail.value = res.data
      }).catch(() => {
      }).finally(() => {
        setLoading(false)
      })
    }
  }

  watch([() => route.query?.sclassCode, () => route.query?.lclassCode, () => customerData.value?.customerKey], ([v]) => {
    getDetailSubHallCategory(v as string)
  })

  const showComputed = computed(() => {
    return {
      hallCategoryDetail: customerData.value?.customerKey && route.query?.lclassCode,
      hallSubCategoryDetail: customerData.value?.customerKey && route.query?.lclassCode && route?.query?.sclassCode
    }
  })

  const onSelectCompany = (data: any) => {
    customerData.value = { customerKey: data?.code, customerName: data?.name }
  }

  const onReset = () => {
    openConfirm({
      content: '입력 내용을 초기화 하겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        handleReset()
      }
    })
  }

  const handleReset = () => {
    customerSearchRef.value?.handleReset()
    customerData.value = undefined
    exhibitionHallCategoryList.value = []
    exhibitionHallCategoryDetail.value = {}
    exhibitionSubHallCategoryDetail.value = {}
    exhibitionSubHallCategoryRegistered.value = []
    openNotification({ content: '입력 내용이 초기화 되었습니다.' })
  }

  const onSaveCategoryDetail = handleSubmitCategoryDetailForm(
    (values) => {
      const reqData: ExhibitionContentHallCategoryUpperDetail = {
        customerId: values.customerId,
        lclassCode: values.lclassCode,
        displayYn: values.displayYn,
        sclassUseYn: values.sclassUseYn
      }
      setLoading(true)
      exhibitionHallCategoryApi.updateUpper(reqData).then(() => {
        openNotification({ content: '저장 되었습니다.' })
        getHallCategoryList()
        getSubHallCategoryList()
      }).catch(() => { })
        .finally(() => { setLoading(false) })
    },
    () => {
      openNotification({ content: '필수입력 항목을 입력해주세요.' })
    }
  )

  const onSaveSubCategoryList = async (data: ExhibitionContentHallCategoryLowerFormItemModel[]) => {
    //register list, confirm update list
    const reqData: ExhibitionHallCategoryRegisLowerListModelRequest = {
      createRequestList: data.map((it) => ({
        ...it,
        lclassCode: categoryDetailFormValues.lclassCode,
        customerId: categoryDetailFormValues.customerId,
        displayYn: categoryDetailFormValues.displayYn
      }))
    }
    if (reqData.createRequestList.length) {

      setLoading(true)
      exhibitionHallCategoryApi.registerLowerList(reqData).then(() => {
        openNotification({ content: '행 추가저장 되었습니다.' })
        getSubHallCategoryList()
      }).catch(() => { }).finally(() => {
        setLoading(false)
      })
    }
  }

  const handleDeleteSubCategory = async (data: { sclassCode: any }) => {
    const { lclassCode, sclassCode } = route.query
    if (data.sclassCode && lclassCode && customerData.value.customerKey) {
      const reqData: ExhibitionHallCategoryDeleteDataLowerModelRequest = {
        lclassCode: lclassCode as string,
        sclassCode: data.sclassCode,
        customerId: customerData.value.customerKey
      }
      setLoading(true)
      exhibitionHallCategoryApi.deleteLower(reqData).then(() => {
        openNotification({ content: '삭제 되었습니다.' })
        getSubHallCategoryList()
        if (String(data.sclassCode) === String(sclassCode)) {
          router.push({
            query: {
              ...route.query,
              sclassCode: null
            }
          })
        }
      }).catch(() => {
        //case api check conner
        //   openNotification({ content: '연결 된 전시 코너가 있습니다.' })
      })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const onSaveSubCategoryDetail = async (data: ExhibitionContentHallCategoryLowerDetail) => {
    if (customerData.value?.customerKey && route.query?.lclassCode) {
      const reqData: ExhibitionContentHallCategoryLowerDetail = {
        customerId: customerData.value?.customerKey,
        lclassCode: route.query?.lclassCode as string,
        sclassCode: data?.sclassCode,
        sclassName: data?.sclassName,
        displayYn: data?.displayYn
      }
      exhibitionHallCategoryApi.updateLower(reqData).then(() => {
        openNotification({ content: '저장 되었습니다.' })
        getDetailSubHallCategory(data?.sclassCode)
        getSubHallCategoryList()
      })
    }
  }

  return {
    customerData,
    customerSearchRef,
    exhibitionHallCategoryTreeComputed,
    exhibitionHallCategoryDetail,
    categoryDetailFormValues,
    exhibitionSubHallCategoryRegistered,
    exhibitionSubHallCategoryDetail,
    showComputed,
    onSelectCompany,
    onSelectTreeItem,
    setCategoryDetailFormFieldValue,
    onReset,
    onSaveCategoryDetail,
    onSaveSubCategoryList,
    onSaveSubCategoryDetail,
    handleDeleteSubCategory
  }
}
