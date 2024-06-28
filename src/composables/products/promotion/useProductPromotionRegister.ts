import { FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss, formatTime, PRODUCT_PROMOTION_LIST } from '@/common'
import { useLoading, useModalConfirm, useModalNotification, useNotificationDatePeriod } from '@/composables'
import {
  EmployeeStatusEnum,
  productOptionsTypeRegisterConfig,
  ProductPromotionDiscountType,
  ProductPromotionRegisterModel,
  YnOptions
} from '@/models'
import { useForm } from 'vee-validate'
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { array, number, object, string } from 'yup'
import { useProductSearchProductModal } from '@/composables/products/modal/modalSearch/useProductSearchProductModal'
import {
  discountPromotionApplicable,
  isOnCoupon,
  ProductBeforeDiscountPromotionListModel,
  ProductDiscountPromotionListModel,
  ProductDiscountPromotionModel,
  ProductSearchProductTableModel
} from '@/models/views/products/modal/ProductSearchProductModalModel'
import { productPromotionDiscountApi } from '@/services/api/products/ProductPromotionDiscountApi'
import {
  ProductDiscountPromotionCloseRequest,
  ProductDiscountPromotionRegisterRequest
} from '@/models/services/requests/products/promotion/ProductPromotionDiscountRequest'

export const useProductPromotionRegister = () => {
  const { openModal: openProductModal } = useProductSearchProductModal()
  const { openModal: openNotification, closeModalByPop } = useModalNotification()
  const { openModal: openConfirm } = useModalConfirm()
  const route = useRoute()
  const discountPromotionKey = route.params.id
  const dataPromotionInfo = ref<ProductDiscountPromotionModel>()
  const isPriceValid = ref(true)
  const fixedPercentage = 2
  const router = useRouter()
  const initPrice = ref(0)
  const { setLoading } = useLoading()

  const validationSchema = {
    discountCat: string().required().oneOf(Object.values(ProductPromotionDiscountType)),
    seller: object().required(),
    // seller: string().when('discountCat', {
    //   is: ProductPromotionDiscountType.SLCP,
    //   then: (schema) => schema.required(),
    //   otherwise: (schema) => schema.nullable(),
    // }),
    promotionName: string().required(),
    discountPeriodBegin: string().required(),
    discountPeriodEnd: string().required(),
    couponApplies: string().required(),
    discountAmount: number().required(),
    promotionCode: string(),
    productDiscounted: array().required()
  }

  const { setFieldValue, values, validate } = useForm<ProductPromotionRegisterModel>({
    validationSchema: validationSchema,
    initialValues: {
      discountCat: ProductPromotionDiscountType.MZ,
      couponApplies: EmployeeStatusEnum.N
    }
  })
  const calculateDiscountPercentage = (discountAmount: number, salePrice: number) => {
    return ((1 - discountAmount / salePrice) * 100).toFixed(fixedPercentage)
  }

  const getPromotionInfo = async (id: string) => {
    setLoading?.(true)
    productPromotionDiscountApi
      .getPromotion(id)
      .then((res) => {
        dataPromotionInfo.value = res.data

        const productData = res.data.boDscntPmtProdDetailList.map((it) => ({
          ...it,
          lastProductSalesStatusName:
            productOptionsTypeRegisterConfig.find((options) => options.value === it?.lastProductSalesStatusCode)?.label ??
            it?.lastProductSalesStatusName
        }))
        handleChangeValueField('product', productData)

        const productDiscountData = res.data.boDscntPmtProdDetailList.map((it) => ({
          ...it,
          couponApplies: it?.discountCouponYn === YnOptions.N ? discountPromotionApplicable.notApplicable : discountPromotionApplicable.applicable,
          progressYn: it?.progressYn === YnOptions.N ? isOnCoupon.notApplicable : isOnCoupon.applicable,
          discountPercentage:
            it.immediatelyProductDiscountAmount || it.immediatelyProductDiscountAmount === 0
              ? calculateDiscountPercentage(it.immediatelyProductDiscountAmount, it.salePrice)
              : 0
        }))
        setFieldValue('productDiscounted', productDiscountData)
        initPrice.value = res.data.productDiscountAmount

        setFieldValue('discountCat', res.data?.discountPriceType)
        setFieldValue('couponApplies', res.data?.discountCouponYn)
        setFieldValue('discountPeriodBegin', res.data?.discountPromotionStartDateTime)
        setFieldValue('discountPeriodEnd', res.data?.discountPromotionEndDateTime)
        setFieldValue('promotionCode', res.data?.discountPromotionId)
        setFieldValue('promotionName', res.data?.discountPromotionName)
        setFieldValue('seller', { code: res.data?.sellerKey, name: '' })
        setFieldValue('sellerFromApi', res.data?.sellerKey?.toString())
        setFieldValue('discountAmount', res?.data?.productDiscountAmount)
      })
      .catch(() => {})
      .finally(() => setLoading?.(false))
  }

  const handleCloseDiscountPromotion = async (record: ProductDiscountPromotionListModel) => {
    const closeRecord: ProductDiscountPromotionCloseRequest = {
      discountPromotionKey: record.discountPromotionKey!,
      productKey: record.productKey
    }
    openConfirm({
      content: '프로모션을 중지할 경우 즉시 반영됩니다. 계속 하시겠습니까?',
      onConfirm: async () => {
        try {
          setLoading?.(true)
          await productPromotionDiscountApi.putClosePromotion(closeRecord)
          await getPromotionInfo(record.discountPromotionKey!)
        } catch (error) {
          // empty
        } finally {
          setLoading?.(false)
          closeModalByPop?.()
        }
      }
    })
  }

  const handleChangeValueField = (field: keyof ProductPromotionRegisterModel, value: any) => {
    setFieldValue(field, value)
  }

  const getProductFromModal = (items: ProductSearchProductTableModel[]) => {
    const itemsProduct = items.map((item) => {
      return {
        productKey: item.productKey,
        productCode: item.productCode,
        productName: item.productName,
        salePrice: item.salePrice,
        lastProductSalesStatusCode: item.lastProductSalesStatusCode,
        lastProductSalesStatusName: item.lastProductSalesStatusName,
        productCreatedBy: item.createdBy,
        productCreatedByName: item.createdByName,
        productCreatedDate: item.createdYyyymmdd,
        progressYn: ''
      }
    })

    const newProductList = values.product ? [...values.product, ...itemsProduct] : itemsProduct
    const uniqueIds = new Set(newProductList?.map((it) => it?.productCode))

    const addedProducts = newProductList.filter((it) => {
      if (uniqueIds.has(it.productCode)) return uniqueIds.delete(it.productCode)
    })

    handleChangeValueField('product', addedProducts)
  }

  const handleOpenModal = () => {
    openProductModal(getProductFromModal, values.product)
  }

  const { handleDateChange } = useNotificationDatePeriod<ProductPromotionRegisterModel>({
    emit: (date, field) => handleChangeValueField(field, date),
    beginDateField: 'discountPeriodBegin',
    endDateField: 'discountPeriodEnd'
  })

  const productCreatedBy = computed(() => {
    if (!dataPromotionInfo.value) {
      return ''
    }
    return `${dataPromotionInfo?.value?.createdByName} (${dataPromotionInfo?.value?.createdBy})`
  })

  const handleAddMultipleDiscount = () => {
    isPriceValid.value = true

    let isInvalidDiscount = false
    const productAfterDiscounted: ProductDiscountPromotionListModel[] = values.product.map((it: ProductBeforeDiscountPromotionListModel) => {
      if (it.salePrice - values.discountAmount < 0) {
        isPriceValid.value = false
      }
      const progressYn = dataPromotionInfo?.value?.progressYn
        ? dataPromotionInfo?.value?.progressYn === YnOptions.N
          ? isOnCoupon.notApplicable
          : isOnCoupon.applicable
        : it?.progressYn === ''
        ? ''
        : isOnCoupon.initial

      const previousProcessText = it?.progressYn ? (it?.progressYn === YnOptions.N ? isOnCoupon.notApplicable : isOnCoupon.applicable) : progressYn

      const calculatedDiscount = {
        productKey: it.productKey,
        productCode: it.productCode,
        productName: it.productName,
        salePrice: it.salePrice,
        lastProductSalesStatusCode: it.lastProductSalesStatusCode,
        lastProductSalesStatusName: it.lastProductSalesStatusName,
        productCreatedBy: it.productCreatedBy,
        productCreatedByName: it.productCreatedByName,
        productCreatedDate: it.productCreatedDate,
        productDiscountAmount: values.discountAmount,
        couponApplies: discountPromotionApplicable.notApplicable,
        immediatelyProductDiscountAmount: 0,
        discountPercentage: '',
        progressYn: previousProcessText
      }
      const previousDiscountAmount = values?.product?.find((item) => item?.productKey === it?.productKey)?.immediatelyProductDiscountAmount

      if ((previousDiscountAmount || previousDiscountAmount === 0) && it?.progressYn === YnOptions.Y) isInvalidDiscount = true

      if (values?.couponApplies === YnOptions.Y) {
        calculatedDiscount.productDiscountAmount = it?.productDiscountAmount
          ? it?.productDiscountAmount + values.discountAmount
          : values.discountAmount
        calculatedDiscount.immediatelyProductDiscountAmount = it.salePrice ? it.salePrice - calculatedDiscount.productDiscountAmount : 0
        const discountPercentage = calculateDiscountPercentage(calculatedDiscount.immediatelyProductDiscountAmount, it.salePrice)
        calculatedDiscount.discountPercentage = discountPercentage
        return calculatedDiscount
      } else {
        if (!previousDiscountAmount && previousDiscountAmount !== 0) {
          calculatedDiscount.productDiscountAmount = previousDiscountAmount ?? values.discountAmount
          calculatedDiscount.immediatelyProductDiscountAmount = it.salePrice ? it.salePrice - calculatedDiscount.productDiscountAmount : 0
          const discountPercentage = calculateDiscountPercentage(calculatedDiscount.immediatelyProductDiscountAmount, it.salePrice)
          calculatedDiscount.discountPercentage = discountPercentage
        } else {
          // case: product promotion is ended, and coupon is not applied
          calculatedDiscount.productDiscountAmount = it.productDiscountAmount ?? 0
          calculatedDiscount.immediatelyProductDiscountAmount = it.immediatelyProductDiscountAmount ?? 0
          const discountPercentage = calculateDiscountPercentage(calculatedDiscount.immediatelyProductDiscountAmount, it.salePrice)
          calculatedDiscount.discountPercentage = discountPercentage
        }
        return calculatedDiscount
      }
    })

    if (isInvalidDiscount && values?.couponApplies === YnOptions.N) {
      setFieldValue('discountAmount', initPrice.value)
      openNotification({
        content: '대상상품 중 이미 쿠폰 프로모션이 등록된 상품이 존재합니다. 해당 상품 제외 후 다시 적용 해주세요.'
      })
      return
    }
    if (isPriceValid.value && values.discountAmount) {
      const isPriceInvalid = productAfterDiscounted.find((it) => it?.immediatelyProductDiscountAmount < 0)
      if (isPriceInvalid) {
        setFieldValue('discountAmount', initPrice.value)
        openNotification({
          content: '할인 금액이 상품 가격보다 큽니다.'
        })
        return
      }
      if (values?.productDiscounted?.length) {
        values.productDiscounted?.forEach((item) => {
          const existingProduct = productAfterDiscounted?.find((product) => product?.productKey === item?.productKey)
          if (!existingProduct) {
            productAfterDiscounted?.push(item)
          }
        })
      }
      if (!values.product || values.product.length === 0) {
        openNotification({
          content: '대상상품이 등록되지 않았습니다.'
        })
        return
      }

      setFieldValue('productDiscounted', productAfterDiscounted)
      // setFieldValue('discountAmount', initPrice.value)
    } else {
      setFieldValue('discountAmount', initPrice.value)
      openNotification({
        content: '할인 금액이 상품 가격보다 큽니다.'
      })
    }
  }

  const handleChangeCouponApplies = (value: string) => {
    setFieldValue('couponApplies', value)
    const productDiscountData = values.productDiscounted.map((it) => ({
      ...it,
      couponApplies: value === YnOptions.N ? discountPromotionApplicable.notApplicable : discountPromotionApplicable.applicable
    }))
    setFieldValue('productDiscounted', productDiscountData)
  }

  const handleCancel = () => {
    openConfirm({
      content: '프로모션 등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        // router.push(PRODUCT_PROMOTION_LIST)
      }
    })
  }
  const handleCancelInBulk = async () => {
    if (discountPromotionKey) {
      const closePromotionData = { discountPromotionKey: discountPromotionKey?.toString() }
      try {
        setLoading?.(true)
        await productPromotionDiscountApi.putClosePromotion(closePromotionData).then((res) => {
          openNotification({ content: res.data?.sucessMessage ?? '' })
        })
        await getPromotionInfo(discountPromotionKey?.toString())
      } catch (error) {
        // empty
      } finally {
        setLoading?.(false)
      }
    } else {
      openNotification({
        content: '진행중인 프로모션이 없습니다.'
      })
    }
  }

  const handleSave = async () => {
    try {
      const { errors: e } = await validate()
      if (Object.keys(e).length !== 0) {
        openNotification?.({
          content: '( <span class="wf_text-sub-01">*</span> ) 표시는 필수입력항목입니다.',
          buttonLabel: '확인'
        })
      } else {
        let dataUpdate: ProductDiscountPromotionRegisterRequest
        if (discountPromotionKey) {
          dataUpdate = {
            discountPromotionKey: discountPromotionKey?.toString(),
            productDiscountAmount: values?.discountAmount?.toString(),
            discountPromotionEndDateTime: values?.discountPeriodEnd && formatTime(values.discountPeriodEnd, FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss),
            discountPromotionStartDateTime: values?.discountPeriodBegin && formatTime(values?.discountPeriodBegin, FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss),
            discountPromotionName: values?.promotionName,
            sellerKey: values?.seller?.code?.toString(),
            discountCouponYn: values?.couponApplies,
            discountPriceType: values?.discountCat,
            discountPromotionId: values?.promotionCode,
            progressYn: dataPromotionInfo?.value?.progressYn,
            boDscntPmtProdDetailList: values?.productDiscounted?.map((item) => ({
              productDiscountAmount: item?.productDiscountAmount?.toString(),
              discountPromotionKey: discountPromotionKey?.toString(),
              productKey: item?.productKey?.toString()
            }))
          }
        } else {
          dataUpdate = {
            productDiscountAmount: values?.discountAmount?.toString(),
            discountPromotionEndDateTime: values.discountPeriodEnd && formatTime(values.discountPeriodEnd, FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss),
            discountPromotionStartDateTime: values?.discountPeriodBegin && formatTime(values?.discountPeriodBegin, FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss),
            discountPromotionName: values?.promotionName,
            sellerKey: values?.seller?.code?.toString(),
            discountCouponYn: values?.couponApplies,
            discountPriceType: values?.discountCat,
            progressYn: dataPromotionInfo?.value?.progressYn,
            boDscntPmtProdDetailList: values?.productDiscounted?.map((item) => ({
              productDiscountAmount: item?.productDiscountAmount?.toString(),
              productKey: item?.productKey?.toString()
            }))
          }
        }
        if (!discountPromotionKey) {
          openConfirm({
            content: '저장 완료 시 할인 금액이 즉시 적용됩니다. 계속 하시겠습니까?',
            onConfirm: () => {
              closeModalByPop?.()
              productPromotionDiscountApi
                .putEditPromotion(dataUpdate)
                .then((res) => {
                  openNotification({
                    content: res.data.sucessMessage ?? '',
                    onAccept: () => {
                      closeModalByPop?.()
                      router.push(PRODUCT_PROMOTION_LIST)
                    }
                  })
                  setFieldValue('promotionCode', res.data?.discountPromotionId)
                })
                .catch(() => {})
            }
          })
        } else {
          productPromotionDiscountApi
            .putEditPromotion(dataUpdate)
            .then((res) => {
              openNotification({
                content: res.data.sucessMessage ?? '',
                onAccept: () => {
                  closeModalByPop?.()
                  router.push(PRODUCT_PROMOTION_LIST)
                }
              })
            })
            .catch(() => {})
        }
      }
    } catch (err) {
      //error
    }
  }
  const handleDeleteRecord = (id: string) => {
    const isPossibleDelete = values.product?.find((it) => {
      return it.productKey?.toString() === id?.toString() && (it?.progressYn === YnOptions.N || it?.progressYn === '')
    })
    if (isPossibleDelete || !values?.productDiscounted) {
      setFieldValue(
        'product',
        values.product.filter((it) => it.productKey?.toString() !== id?.toString())
      )
      values?.productDiscounted && handleDeleteRecordDiscount(id)
    } else {
      openNotification?.({
        content: '진행중인 프로모션은 삭제할 수 없습니다.'
      })
    }
  }
  const handleDeleteRecordDiscount = (id: string) => {
    setFieldValue(
      'productDiscounted',
      values?.productDiscounted?.filter(
        (it) => it?.productKey?.toString() !== id?.toString() || (it?.productKey?.toString() === id?.toString() && it?.progressYn === YnOptions.Y)
      )
    )
  }

  watch(
    () => discountPromotionKey,
    (newID) => {
      if (newID) {
        getPromotionInfo(newID?.toString())
      }
    },
    { immediate: true }
  )

  return {
    values,
    handleChangeValueField,
    handleOpenModal,
    setFieldValue,
    handleCancel,
    handleCancelInBulk,
    handleSave,
    handleDateChange,
    handleAddMultipleDiscount,
    handleDeleteRecord,
    handleDeleteRecordDiscount,
    dataPromotionInfo,
    discountPromotionKey,
    handleCloseDiscountPromotion,
    handleChangeCouponApplies,
    productCreatedBy
  }
}
