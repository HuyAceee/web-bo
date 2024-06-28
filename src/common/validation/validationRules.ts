import { bnameRegex, emailRegex, integerRegex, phoneWithCharacterRegex, formatPhoneNumber } from '@/common/regex'
import { boolean, mixed, number, string } from 'yup'
import { ALL_COMMON_MESSAGES, PASSWORD_REQUIRED } from './errorMessages'

export const isEmail = string().email()
export const isString = string()
export const isEmpty = string().trim().required()
export const isNumber = number()

export const isPasswordEmpty = string().required(PASSWORD_REQUIRED)
export const isBoolean = boolean()

/* [or mix rules](https://www.npmjs.com/package/yup#mixed) */
/* write separate test function and pass to callback if any type error happen */
export const isValidPattern = (value: any, pattern: RegExp) => {
  return pattern.test(value)
}

export const isInteger = (value: any) => {
  return integerRegex.test(value)
}
export const integerNumber = mixed().test('is-integer', 'The number must be integer!', isInteger)

export const isEven = (value: any) => {
  const val = isInteger(value)
  if (val && value % 2 === 0) {
    return true
  }
  return false
}

export const evenNumber = mixed().test('is-even', 'The number must be even!', isEven)
export const isValidEmail = (value: any) => {
  return emailRegex.test(value)
}
export const isBNameDataValid = (value: string) => {
  return bnameRegex.test(value)
}
export const isValidPhoneNumberWithCharacter = (value: any) => {
  return phoneWithCharacterRegex.test(value)
}
export const removeLettersPhoneNumber = (value: string) => {
  return value.replace(formatPhoneNumber, '')
}
export const isValidImage = (fileType: string) => {
  return fileType !== 'image/png' && fileType !== 'image/jpeg' && fileType !== 'image/gif' && fileType !== 'image/jpg'
}
export const isValidVideo = (fileType: string) => {
  return fileType !== 'video/mp4'
}

export const requiredFieldMissing = string().required(ALL_COMMON_MESSAGES.MISSING_REQUIRED_DATA)

export const isValidDocument = (fileType: string) => {
  return fileType !== 'image/png' && fileType !== 'image/jpeg' && fileType !== 'application/pdf' && fileType !== 'image/jpg'
}
/*
usage:
export const validationSchema = yup.object().shape({
     age: customRule.required()
    // other validation rules...
});
*/

export const acceptNumberKey = (event: KeyboardEvent) => {
  if (!isInteger(event.key)) {
    event.preventDefault()
  }
}

export const acceptNumberKeyWithoutLeadingZero = (event: KeyboardEvent) => {
  acceptNumberKey(event)
  if ((event?.target as HTMLInputElement)?.selectionStart === 0 && event.key === '0') {
    event.preventDefault()
  }
}
