import { useLoading, useModalNotification } from '@/composables'
import {
  _10MB,
  _250MB,
  _5MB,
  ERROR_TYPE,
  isValidDocument,
  isValidImage,
  isValidVideo,
  TYPE_DOCUMENT_FILE,
  TYPE_IMAGE_FILE,
  TYPE_VIDEO_FILE
} from '@/common'
import { ProductImageType, ProductSelectDefinitionType } from '@/models'
import { productUploadAttachmentApi } from '@/services/api/products/ProductUploadAttachMentApi'
import { operatingUploadImageApi } from '@/services/api/operating/OperatingUploadAttachmentApi'
import { productCategoryApi } from '@/services/api/products/category/ProductCategoryApi'
import { exhibitionSellerApi } from '@/services/api/exhibition/ExhibitionSellerApi'
import { exhibitionSearchBannerApi } from '@/services/api/exhibition/ExhibitionSearchBannerApi'
import { exhibitionCommonBannerRegisApi } from '@/services/api/exhibition/ExhibitionBannerRegistrationApi'
import { exhibitionWindowRegistrationApi } from '@/services/api/exhibition/ExhibitionWindowRegistrationApi'
import { exhibitionSpecialConnectionManagementApi } from '@/services/api/exhibition/ExhibitionSpecialConnectionManagementApi'

export const useUploadFile = () => {
  const { setLoading } = useLoading()
  const { openModal, closeModalByPop } = useModalNotification()
  const handleFileChange = (type: any, callback: any) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = type === 'image' ? TYPE_IMAGE_FILE : type === 'video' ? TYPE_VIDEO_FILE : TYPE_DOCUMENT_FILE
    input.addEventListener('change', () => {
      const file = input.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        try {
          setLoading?.(true)
          reader.onload = function () {
            if (reader.DONE) {
              setLoading?.(false)
            }
            callback({ file, url: reader.result })
            input.remove()
          }
        } catch (error) {
          setLoading?.(false)
        }
      }
    })
    input.click()
  }

  const handleValidFile = (
    file: any,
    alt: string,
    type: string,
    checkTypeImage: ProductImageType,
    callback: any,
    definitionType?: ProductSelectDefinitionType
  ) => {
    if (!file) {
      closeModalByPop?.()
      callback({ alt })
      return
    }
    if (type === 'image') {
      const image = new Image()
      image.src = URL.createObjectURL(file)

      image.onload = (e: any) => {
        const imageWidth = e.target.width
        const imageHeight = e.target.height
        if (isValidImage(file.type)) {
          openModal?.({
            content: '지원하지 않는 파일형식입니다.이미지(jpg, gif, png) 파일만 등록 할 수 있습니다.'
          })
          callback(ERROR_TYPE)
          return
        }

        if (checkTypeImage === 'square' && imageWidth !== imageHeight) {
          openModal?.({
            content: '이미지는 0000x0000px로 등록 해주세요.'
          })
          callback(ERROR_TYPE)
          return
        }
        if (checkTypeImage === 'pcBanner' && imageWidth !== 1200) {
          openModal?.({
            content: '이미지는 1200x0000px로 등록 해주세요.'
          })
          callback(ERROR_TYPE)
          return
        }

        if (file.size > _5MB) {
          openModal?.({
            content: '이미지는 5MB 이하만 등록 가능합니다.'
          })
          callback(ERROR_TYPE)
          return
        }

        switch (definitionType) {
          case ProductSelectDefinitionType.CATEGORY:
            productCategoryApi
              .uploadDisplay(file)
              .then((data) => {
                const newData = data.data
                openModal?.({
                  content: '이미지가 등록 되었습니다.',
                  onAccept: () => {
                    closeModalByPop?.()
                    callback({ file, alt, url: URL.createObjectURL(file), newData })
                  }
                })
              })
              .catch(() => {})
            break
          case ProductSelectDefinitionType.EXHIBITION_SELLER:
            exhibitionSellerApi
              .uploadFile(file)
              .then((data) => {
                openModal?.({
                  content: '이미지가 등록 되었습니다.',
                  onAccept: () => {
                    closeModalByPop?.()
                    callback({ file, alt, url: URL.createObjectURL(file), newData: data.data })
                  }
                })
              })
              .catch(() => {})
            break
          case ProductSelectDefinitionType.EXHIBITION_SEARCH_BANNER:
            exhibitionSearchBannerApi
              .uploadFile(file)
              .then((data) => {
                openModal?.({
                  content: '이미지가 등록 되었습니다.',
                  onAccept: () => {
                    closeModalByPop?.()
                    callback({ file, alt, url: URL.createObjectURL(file), newData: data.data })
                  }
                })
              })
              .catch(() => {})
            break
          case ProductSelectDefinitionType.EXHIBITION_COMMON_BANNER:
            exhibitionCommonBannerRegisApi
              .uploadFile(file)
              .then((data) => {
                openModal?.({
                  content: '이미지가 등록 되었습니다.',
                  onAccept: () => {
                    closeModalByPop?.()
                    callback({ file, alt, url: URL.createObjectURL(file), newData: data.data })
                  }
                })
              })
              .catch(() => {})
            break
          case ProductSelectDefinitionType.EXHIBITION_SPECIAL:
            exhibitionSpecialConnectionManagementApi
              .uploadFile(file)
              .then((data) => {
                openModal?.({
                  content: '이미지가 등록 되었습니다.',
                  onAccept: () => {
                    closeModalByPop?.()
                    callback({ file, alt, url: URL.createObjectURL(file), newData: data.data })
                  }
                })
              })
              .catch(() => {})
            break
          case ProductSelectDefinitionType.EXHIBITION_COMMON_POPUP_REGIS:
            exhibitionWindowRegistrationApi
              .uploadFile(file)
              .then((data) => {
                openModal?.({
                  content: '이미지가 등록 되었습니다.',
                  onAccept: () => {
                    closeModalByPop?.()
                    callback({ file, alt, url: URL.createObjectURL(file), newData: data.data })
                  }
                })
              })
              .catch(() => {})
            break
          case ProductSelectDefinitionType.OPERATING_MEDICAL_IMAGE:
          case ProductSelectDefinitionType.OPERATING_OG_TAG_IMAGE:
            operatingUploadImageApi
              .uploadAttachFile(
                file,
                alt,
                definitionType === ProductSelectDefinitionType.OPERATING_MEDICAL_IMAGE ? 'medical-device-sales-declaration' : 'og-tag'
              )
              .then((data) => {
                const newData = { ...data.data, url: URL.createObjectURL(file) }
                openModal?.({
                  content: '이미지가 등록 되었습니다.',
                  onAccept: () => {
                    closeModalByPop?.()
                    callback({ file, alt, url: URL.createObjectURL(file), newData })
                  }
                })
              })
              .catch(() => {})
            break
          case ProductSelectDefinitionType.PRODUCT:
          default:
            productUploadAttachmentApi
              .uploadAttachFile(file)
              .then((data) => {
                const newData = data.data
                openModal?.({
                  content: '이미지가 등록 되었습니다.',
                  onAccept: () => {
                    closeModalByPop?.()
                    callback({ file, alt, url: URL.createObjectURL(file), newData })
                  }
                })
              })
              .catch(() => {})
        }
      }
      image.onerror = () => {
        openModal?.({
          content: '지원하지 않는 파일형식입니다.이미지(jpg, gif, png) 파일만 등록 할 수 있습니다.'
        })
        callback(ERROR_TYPE)
      }
      return
    }

    if (type === 'video') {
      if (isValidVideo(file.type)) {
        openModal?.({
          content: '<p>지원하지 않는 파일 형식입니다.</p><p>MP4 파일만 등록 할 수 있습니다.</p>'
        })
        callback(ERROR_TYPE)
        return
      }
      if (file.size > _250MB) {
        openModal?.({
          content: '동영상은 250MB 이하만 등록 가능합니다.'
        })
        callback(ERROR_TYPE)
        return
      }

      switch (definitionType) {
        case ProductSelectDefinitionType.EXHIBITION_SELLER:
          setLoading?.(true)
          exhibitionSellerApi
            .uploadFile(file)
            .then((data) => {
              openModal?.({
                content: '이미지가 등록 되었습니다.',
                onAccept: () => {
                  closeModalByPop?.()
                  callback({ file, alt, url: URL.createObjectURL(file), newData: data.data })
                }
              })
            })
            .catch(() => {})
            .finally(() => {
              setLoading?.(false)
            })
          break
        case ProductSelectDefinitionType.EXHIBITION_SEARCH_BANNER:
          setLoading?.(true)
          exhibitionSearchBannerApi
            .uploadFile(file)
            .then((data) => {
              openModal?.({
                content: '이미지가 등록 되었습니다.',
                onAccept: () => {
                  closeModalByPop?.()
                  callback({ file, alt, url: URL.createObjectURL(file), newData: data.data })
                }
              })
            })
            .catch(() => {})
            .finally(() => {
              setLoading?.(false)
            })
          break
        case ProductSelectDefinitionType.PRODUCT:
        default:
          setLoading?.(true)
          productUploadAttachmentApi
            .uploadAttachFile(file)
            .then(() => {
              openModal?.({
                content: '동영상이 등록 되었습니다.',
                onAccept: () => {
                  closeModalByPop?.()
                  callback({ file, url: URL.createObjectURL(file) })
                }
              })
            })
            .catch(() => {})
            .finally(() => {
              setLoading?.(false)
            })
      }

      return
    }

    if (type === 'document') {
      if (isValidDocument(file.type)) {
        openModal?.({
          content: '지원하지 않는 파일 형식입니다.이미지(jpg, pdf, png) 파일만 등록 할 수 있습니다.'
        })
        callback(ERROR_TYPE)
        return
      }
      if (file.size > _10MB) {
        openModal?.({
          content: '동영상은 10MB 이하만 등록 가능합니다.'
        })
        callback(ERROR_TYPE)
        return
      }
      callback({ file, url: URL.createObjectURL(file) })
    }
  }

  return {
    handleFileChange,
    handleValidFile
  }
}
