import { BaseModelResponse } from '../../BaseModelResponse'

export interface OperatingTicketAttachFileModelResponse extends BaseModelResponse<
  {
    attachfilePathName?: string,
    attachfileName?: string,
    dirFileName?: string,
    attachfileOriginName?: string
  }
> { }