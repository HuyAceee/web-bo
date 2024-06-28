import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
export interface ComplaintResearchMemberModelRequest extends PaginationModelRequest {
  memberKey: string
  memberName: string
  memberId: string
  customerKey: string
  employeeNumber: string
  cellphoneNumber: string
  gradeCode: string
  accountStatusCode: string
  marketingAgreeYn: string
  startDate: string
  endDate: string
}
