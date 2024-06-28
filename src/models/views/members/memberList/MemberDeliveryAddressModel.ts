export interface MemberDeliveryAddressModel {
    id: string,
    deliveryAddressKey: string,
    memberKey: string,
    deliveryAddressCode: string,
    deliveryLoadNameAddress: string,
    deliveryLoadLotBasedAddress: string,
    deliveryDetailedAddress: string,
    deliveryTelNumber: string,
    deliveryCellphoneNumber: string,
    isSelected: boolean
    deliveryAddressBaseYn: string
    deliveryAddressName: string
    deliveryZipCode: string
}  

export enum MemberDeliveryAddressCodeType {
    HOME = '자택',
    COMPANY = '직장',
    ETC = '기타',
  }