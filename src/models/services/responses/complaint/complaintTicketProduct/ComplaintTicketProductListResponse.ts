import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { ComplaintTicketProductListDataTableModel } from '@/models/views/complaint/complaintTicketProduct/ComplaintTicketProductListModel'

export interface ComplaintTicketProductListResponse extends DataTablePaginationResponseModel<ComplaintTicketProductListDataTableModel> {}
