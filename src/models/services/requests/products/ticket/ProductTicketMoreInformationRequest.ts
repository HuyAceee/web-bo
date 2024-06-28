import { ProductAttachFileInsertResponse } from '@/models/services/responses/products/ticket/ProductTicketMoreInformationResponse'
import { ProductTicketDataFileModel, ProductTicketMoreInformationModel } from '@/models/views'
export class ProductTicketMoreInformationRequest {
  static from(item: ProductTicketDataFileModel) {
    return {
      productAttachfileKey: item.key,
      productKey: item.productKey,
      imageRepresentativeYn: item.imageRepresentativeYn,
      attachfilePathName: item.url,
      attachfileName: item.name
    }
  }

  static fromInsert(item: ProductTicketDataFileModel) {
    return {
      productAttachfileKey: item.key,
      productKey: item.productKey,
      imageRepresentativeYn: item.imageRepresentativeYn,
      attachfilePathName: item.url,
      attachfileName: item.name
    }
  }
  static fromPostDescription(item: ProductTicketMoreInformationModel) {
    return {
      modifiedBy: null,
      productKey: item.productKey as number,
      detailChannel: item.type,
      pcDetailHtmlContents: item.description,
      mobileDetailHtmlContents: item.mobileDescription
    }
  }

  static fromRegisterFileConvert(item: ProductTicketDataFileModel[]): ProductAttachFileInsertResponse {
    const convert = item.filter((item: ProductTicketDataFileModel) => {
      if (item.name && item.url) return item
    })
    return {
      boAttachFileInsertList: convert.map((item: ProductTicketDataFileModel) => {
        if (item.name && item.url) {
          return {
            modifiedBy: null,
            productKey: item.productKey,
            attachfileType: item.fileType,
            imageRepresentativeYn: item.imageRepresentativeYn ? item.imageRepresentativeYn : 'N',
            attachfilePathName: item.url,
            attachfileName: item.name,
            attachfileOriginName: item.originName,
            attachfileAltName: item.alt ? item.alt : item.name
          }
        }
      })
    }
  }

  // Approval

  static fromApproveDeleteFile(item: ProductTicketDataFileModel) {
    return {
      productRequestAttachfileKey: item.productRequestAttachFileKey,
      productReqeustKey: item.productRequestKey,
      imageRepresentativeYn: item.imageRepresentativeYn,
      attachfilePathName: item.url,
      attachfileName: item.name,
      productAttachfileKey: item.key
    }
  }

  static fromApprovalInsert(item: ProductTicketDataFileModel) {
    return {
      productAttachfileKey: item.key,
      productKey: item.productKey,
      imageRepresentativeYn: item.imageRepresentativeYn,
      attachfilePathName: item.url,
      attachfileName: item.name
    }
  }
  static fromApprovalPostDescription(item: ProductTicketMoreInformationModel) {
    return {
      modifiedBy: null,
      productKey: item.productKey,
      detailChannel: item.type,
      pcDetailHtmlContents: item.description,
      mobileDetailHtmlContents: item.mobileDescription,
      productReqeustKey: item.productRequestKey
    }
  }

  static fromApprovalRegisterFileConvert(item: ProductTicketDataFileModel[]) {
    const convertReq = item.filter((item: ProductTicketDataFileModel) => {
      if (item.name && item.url) return item
    })
    return {
      boTempAttachFileInsertList: convertReq.map((item: ProductTicketDataFileModel) => {
        if (item.name && item.url) {
          return {
            modifiedBy: null,
            productKey: item.productKey,
            attachfileType: item.fileType,
            imageRepresentativeYn: item.imageRepresentativeYn ? item.imageRepresentativeYn : 'N',
            attachfilePathName: item.url,
            attachfileName: item.name,
            attachfileOriginName: item.originName,
            attachfileAltName: item.alt ? item.alt : item.name,
            productReqeustKey: item.productRequestKey
          }
        }
      })
    }
  }
}
