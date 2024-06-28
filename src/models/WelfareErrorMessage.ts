export interface WelfareErrorMessage {
  [errorCode: string]: string
}

export enum ErrorType {
  ALL_COMMON_MESSAGES = 'ALL_COMMON_MESSAGES',
  ALL_MESSAGES = 'ALL_MESSAGES',
  ALL_MAIN_MESSAGES = 'ALL_MAIN_MESSAGES'
}
