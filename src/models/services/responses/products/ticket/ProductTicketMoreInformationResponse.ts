import {
  ProductTicketDataFileModel,
  ProductTicketItemOptionManageModel,
  ProductTicketMoreInformationModel,
  ProductTicketMoreInformationTypeDescription
} from '@/models/views'
import { BaseModelResponse } from '../../BaseModelResponse'
import { getImageUrlFrom } from '@/common/imageUtils'
import { ProductAttachFileType } from '@/models/views/products/common/ProductTypeModel'

export interface ProductTicketAttachFileModel {
  productAttachfileKey: number
  productKey: string
  attachfileType: string
  imageRepresentativeYn: string
  attachfilePathName: string
  attachfileName: string
  attachfileOriginName?: string
  attachfileAltName: string
}

interface ProductTicketMoreInfoModel {
  productKey: number
  productCode: string
  detailChannel: string
  detailChannelName: string
  pcDetailHtmlContents: string
  mobileDetailHtmlContents: string
  boAttachFileList: ProductTicketAttachFileModel[]
  boTempAttachFileList?: any[]
  productReqeustKey?: number
  lastProductProgressStatusCode?: string
}

interface ProductTicketReturnFileDataConvertor {
  dataImages: ProductTicketDataFileModel[]
  dataVideos: ProductTicketDataFileModel[]
}
export interface ProductAttachFileInsertResponse {
  boAttachFileInsertList: any[]
}
export interface ProductApproveAttachFileInsertResponse {
  boTempAttachFileInsertList: any[]
}
export interface ProductTicketMoreInformationResponse extends BaseModelResponse<ProductTicketMoreInfoModel> {}
export interface ProductTicketUpdateSuccessResponse extends BaseModelResponse<ProductTicketItemOptionManageModel> {}

export interface ProductTicketAttachFileModelResponse
  extends BaseModelResponse<{
    attachfilePathName?: string
    attachfileName?: string
    dirFileName?: string
    attachfileOriginName?: string
  }> {}

export class ProductTicketMoreInformationResponseApiConVertor {
  static from(item: ProductTicketMoreInfoModel): ProductTicketMoreInformationModel {
    return {
      description: item?.pcDetailHtmlContents,
      mobileDescription: item?.mobileDetailHtmlContents,
      type: ProductTicketMoreInformationTypeDescription?.ALL,
      arrImage: item?.boAttachFileList,
      productKey: item?.productKey,
      detailChannel: item?.detailChannel,
      arrFileApproval: item?.boTempAttachFileList,
      productRequestKey: item?.productReqeustKey,
      lastProductProgressStatusCode: item?.lastProductProgressStatusCode
    }
  }

  static fromDataFile(itemFile: any): ProductTicketReturnFileDataConvertor {
    const itemsImages: ProductTicketDataFileModel[] = []
    const itemVideos: ProductTicketDataFileModel[] = []
    for (const element of itemFile) {
      const dirFileName = `${element?.attachfilePathName}/${element.attachfileName}`
      const dataItem: ProductTicketDataFileModel = {
        name: element?.attachfileName,
        url: element?.attachfilePathName,
        alt: element?.attachfileAltName,
        key: element?.productAttachfileKey,
        productKey: element?.productKey,
        imageRepresentativeYn: element?.imageRepresentativeYn,
        originName: element?.attachfileOriginName,
        fileType: element?.attachfileType,
        productRequestKey: element?.productReqeustKey,
        productRequestAttachFileKey: element?.productRequestAttachfileKey,
        urlReview: getImageUrlFrom({
          dirFileName
        })
      }

      if (element?.attachfileType == ProductAttachFileType.IMAGE || !element?.attachfileType) {
        itemsImages.push({ ...dataItem })
      } else {
        itemVideos.push({ ...dataItem })
      }
    }
    return {
      dataImages: itemsImages,
      dataVideos: itemVideos
    }
  }
}
