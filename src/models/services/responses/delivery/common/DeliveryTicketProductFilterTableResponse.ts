import { FORMAT_DATE_YYYY_MM_DD_HH_mm_ss, formatNumberDot, formatTime, renderLabelEnum } from '@/common'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { DeliveryTicketProductFilterTableModel, deliveryTicketStatusOptions, renderStandardCategoriesName } from '@/models/views/delivery/common'
import { deliveryOrderProcessStatusCommonCodeName } from '@/models/views/delivery/modal/DeliveryIssuanceDelayInfoModel'
import { DeliveryProductTypeOptions } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderStatusProductModel'

export interface DeliveryTicketProductFilterTableResponse extends DataTablePaginationResponseModel<DeliveryTicketProductFilterTableModel> {}

export const DeliveryTicketProductFilterTableResponseConvertor = (data: DeliveryTicketProductFilterTableModel[]) => {
  return data?.map((item: DeliveryTicketProductFilterTableModel) => ({
    ...item,
    id: item?.receiverProductOrderKey,
    standardCategoryName: renderStandardCategoriesName(item?.standardCategories ?? []),
    orderStatus: renderLabelEnum(deliveryOrderProcessStatusCommonCodeName, item?.orderStatus),
    claimStatus: renderLabelEnum(deliveryOrderProcessStatusCommonCodeName, item?.claimStatus),
    ticketStatus: renderLabelEnum(deliveryTicketStatusOptions, item?.ticketStatus),
    productType: renderLabelEnum(DeliveryProductTypeOptions, item?.claimStatus),
    externalTicketNumber: formatNumberDot(Number(item?.externalTicketNumber)) ?? 0,
    receiverPhoneNumber: formatNumberDot(Number(item?.receiverPhoneNumber)) ?? 0,
    balance: formatNumberDot(Number(item?.balance)) ?? 0,
    issueDate: formatTime(item?.issueDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) ?? '',
    expireDate: formatTime(item?.expireDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) ?? '',
    paymentDate: formatTime(item?.paymentDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) ?? ''
  }))
}
