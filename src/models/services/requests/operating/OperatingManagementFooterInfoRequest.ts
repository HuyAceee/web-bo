export interface OperatingManagementFooterInfoRequest {
  basicInformation: {
    enterpriseName: string,
    representative: {
      name: string,
      telNumber: string
    },
    taxpayerIdentificationNumber: string,
    mailOrderSalesCode: string,
    faxTelNumber: string,
    address: {
      zipCode: number,
      streetName: string,
      lotNumber: string,
      detailAddress: string
    },
    securityManagerName: string,
    siteEmail?: string,
    customerServiceCenterTelNumber: string,
    medicalDeviceSalesDeclarationFileId: string
  },
  siteInformation: {
    title?: string,
    pageDescription?: string,
    siteName?: string,
    ogTagFileId?: string
  }
}
