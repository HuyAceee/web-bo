import { BaseModelResponse } from "@/models/services/responses/BaseModelResponse"

export type ExhibitionDetailExcludeCustomerModelResponse = BaseModelResponse<{
  customerKey?: number | string
}[]>