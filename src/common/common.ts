import { FilterResult, WelfareRadioProps, WelfareSelectOptionType } from '@/models'
import { matchSequenceStringNumberRegex, numberFormatRegex } from './regex'
import { BACKSPACE_KEY_CODE } from '@/common/constant'

// format money with "," => ex: 100,000
export function formatNumberDot(num = 0) {
  if (num !== undefined && num !== null) {
    return `${num?.toString().replace(numberFormatRegex, '$1,')}`
  }
  return ''
}

export const scrollMouseHorizontal = (event: any, element: Element) => {
  event.preventDefault()
  element.scrollLeft += event?.deltaY
}

export function isEmptyObject(o: any) {
  return Object.keys(o).length === 0 && o.constructor === Object
}

export function deepEqualObject(object1: any, object2: any) {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    const val1 = object1[key]
    const val2 = object2[key]
    const areObjects = typeof val1 === 'object' && typeof val2 === 'object'
    if ((areObjects && !deepEqualObject(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false
    }
  }

  return true
}

export const cloneArray = <T>(data?: T[], isDefaultObjectWhenEmpty: boolean = true): T[] => {
  const length = data?.length ?? 0
  if (length > 0) return JSON.parse(JSON.stringify(data))
  if (!isDefaultObjectWhenEmpty) return []
  return [{} as T]
}

export const getRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(randomNumberLessThanOne() * characters.length))
  }
  return result
}

/**
 * Returns a pseudorandom number between 0 and 1.
 */
export const randomNumberLessThanOne = () => {
  return window.crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32
}

export const filterDuplicateField = <T>(arrays: T[], fieldNumber: number): FilterResult<T> => {
  const duplicateFields = new Set<string>()
  const invalidItems: T[] = []

  const validItems = arrays.filter((item) => {
    const fieldValue = (item as any[])[fieldNumber] // Assuming the items are arrays

    if (!duplicateFields.has(fieldValue)) {
      duplicateFields.add(fieldValue)
      return true
    } else {
      invalidItems.push(item)
      return false
    }
  })

  return {
    validItems,
    invalidItems
  }
}

/**
 * Converts an array of objects into an object, using specified keys.
 * If a key does not exist in an object, a default field value is used.
 *
 * @param array - The array of objects to convert.
 * @param keys - The keys to use when converting the objects.
 * @param defaultFieldValue - The default field value to use when a key does not exist.
 * @returns The converted object.
 */
export const convertArrayToObject = <T>(array: T[], keys: (keyof T)[], defaultFieldValue: string = ''): Record<string, any> => {
  return keys.reduce(
    (obj, key, idx) => {
      obj[String(key)] = (array[idx] || String(array[idx]) === '0' ? array[idx] : defaultFieldValue) as T[keyof T]
      return obj
    },
    {} as Record<string, T[keyof T]>
  )
}

export const convertNestedArraysToObject = <T>(array: T[][], keys: (keyof T)[], defaultFieldValue?: string): Record<string, any>[] => {
  const data: Record<string, T>[] = []

  array.forEach((item) => {
    if (item && item?.length > 0) {
      const converted = convertArrayToObject(item, keys, defaultFieldValue)
      data.push(converted)
    }
  })

  return data
}

///
// const m = RegExp(lengthTextRegex).exec(encodeURIComponent(str))
// return `${str}`.length + (m ? m.length : 0)
export const getLastKeyByValue = (obj: Record<string, any>): string => {
  let lastKey: string = ''
  const hasOwnProperty = Object.prototype.hasOwnProperty

  for (const key in obj) {
    if (hasOwnProperty.call(obj, key) && !!obj[key]) {
      lastKey = key
    }
  }

  return lastKey ?? Object.keys(obj).pop()
}

export const lengthInUtf8Bytes = (str: string | number) => {
  const content = String(str)
  let byteLen = 0
  for (let i = 0; i < content.length; i++) {
    const c = content.charCodeAt(i)
    byteLen += c < 1 << 7 ? 1 : 2
  }
  return byteLen
}

export const formatTextLength = (text: number | string | undefined, maxLength: number | string = 200, hiddenLablelTextBytes?: boolean) => {
  return `${lengthInUtf8Bytes(text ?? '')}/${maxLength} ${hiddenLablelTextBytes ? '' : 'bytes'}`
}

export const getStringWithLimitBytes = (str: string, maxBytes: number): string => {
  let byteLen = 0
  let result = ''

  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i)
    byteLen += c < 1 << 7 ? 1 : 2
    if (byteLen > maxBytes) {
      // If adding the current character exceeds the desired byte length,
      // break out of the loop to avoid exceeding the specified limit.
      break
    }

    result += str[i]
  }

  return result
}

export function createEnumFromKeys<T extends Record<string, any>>(obj: T): { [K in keyof T]: K } {
  return Object.keys(obj).reduce(
    (acc, key) => {
      acc[key as keyof T] = key as keyof T
      return acc
    },
    {} as { [K in keyof T]: K }
  )
}

export const convertDateLocalDateTime = (date?: string) => {
  if (!date) return ''
  return new Date(date).toISOString().slice(0, 19)
}

export const isAnyPropertyEmpty = (obj: Record<string, any>): boolean => {
  return Object.values(obj).some((value) => value === '' || value === null || value === undefined)
}

export function sortObjectFields<T extends Record<string, any>>(obj: T, desiredOrder: Array<keyof T>): T {
  const sortedObj: Record<string, unknown> = {}
  for (const key of desiredOrder) {
    sortedObj[key as string] = obj?.[key] ?? ''
  }
  return sortedObj as T
}

export function convertObjectToQueryString(obj: Record<string, string | number>) {
  const queryStringParts = []
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const encodedKey = encodeURIComponent(key)
      let encodedValue = encodeURIComponent(obj[key])
      if (typeof obj[key] === 'object') {
        encodedValue = JSON.stringify(obj[key])
      }
      queryStringParts.push(`${encodedKey}=${encodedValue}`)
    }
  }
  return queryStringParts.join('&')
}

export const onpenWindowWithQueryString = (pathname: string, queries: Record<string, string | number>) => {
  const queryString = convertObjectToQueryString(queries)
  window.open(pathname + '?' + queryString)
}

export function isAllPropertyObjectEmpty(obj: Record<string, any>): boolean {
  const hasOwnProperty = Object.prototype.hasOwnProperty
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      const value = obj[key]
      // Check if the value is null, undefined, or an empty string
      if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
        continue // Continue to the next iteration
      } else if (Array.isArray(value) && value.length === 0) {
        continue // Continue to the next iteration
      } else {
        return false // Value is not empty, so the object is not empty
      }
    }
  }

  return true // All values are empty, so the object is considered empty
}

export function isTwoArrayEqual<T>(array1: T[], array2: T[]): boolean {
  if (array1.length !== array2.length) {
    return false
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false
    }
  }

  return true
}

export function removeEmptyObjectProperties<T>(obj: T): Partial<T> {
  const newObj: Partial<T> = {}

  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      newObj[key] = obj[key]
    }
  }

  return newObj
}

export const calculateTotalFieldValues = <T>(arr: T[], fields: [keyof T]): T => {
  if (!arr?.length) return {} as T
  const result: T = {} as T
  fields.forEach((field) => {
    if (typeof arr?.[0]?.[field] === 'number') {
      result[field] = arr.reduce((acc, cur) => {
        return acc + Number(cur?.[field])
      }, 0) as T[keyof T]
    }
  })
  return result
}

export const renderLabelEnum = (options: WelfareSelectOptionType[] | WelfareRadioProps[], value: string) => {
  if (!options?.length) return value
  return options?.find((option) => option.value === value)?.label ?? ''
}

export function sortByField(arr: any[], field: string) {
  return arr.sort((a, b) => {
    const aValue = a[field]
    const bValue = b[field]
    return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
  })
}

/**
 * Counts the number of matches of a given pattern in a string.
 *
 * @param {string} string - The input string to search for matches.
 * @param {string} pattern - The pattern to match against the input string.
 * @return {number} The number of matches found in the input string.
 */
export const countMatches = (string: string, pattern: string) => {
  const regex = new RegExp(pattern, 'g')
  const matches = string.match(regex)
  return matches ? matches.length : 0
}

export const getFirstNumberFromString = (text: string) => {
  const match = text ? RegExp(matchSequenceStringNumberRegex).exec(text) : []
  if (match) {
    return parseInt(match[0], 10)
  }
  return undefined
}
/**
 * Returns an array of items from newArr that have a different value for the differingProperty compared to the corresponding item in oldArr.
 * @param oldArr - The first array of items.
 * @param newArr - The second array of items.
 * @param key - The key to compare items in oldArr and newArr.
 * @param differingProperty - The property to compare for differences.
 * @returns An array of items from newArr that have a different value for the differingProperty compared to the corresponding item in oldArr.
 */
export const getArrayDifferentItemsByProperty = <T extends Record<keyof T, any>>(
  oldArr: T[],
  newArr: T[],
  key: keyof T,
  differingProperty: keyof T
): T[] => {
  const differences: T[] = []

  newArr.forEach((item2) => {
    const correspondingItem1 = oldArr.find((item1) => item1[key] === item2[key])

    if (correspondingItem1 && correspondingItem1[differingProperty] !== item2[differingProperty]) {
      differences.push(item2)
    }
  })

  return differences
}

export const handleKeyBackspaceResetValue = (event: KeyboardEvent, resetCallback: () => void) => {
  if (event?.keyCode === BACKSPACE_KEY_CODE) {
    resetCallback()
    ;(event?.target as HTMLLIElement)?.blur()
  }
}
export const getOS = () => {
  let name = 'Not known'
  if (navigator.appVersion.indexOf('Win') != -1) name = 'Windows OS'
  if (navigator.appVersion.indexOf('Mac') != -1) name = 'MacOS'
  if (navigator.appVersion.indexOf('X11') != -1) name = 'UNIX OS'
  if (navigator.appVersion.indexOf('Linux') != -1) name = 'Linux OS'
  return name
}

export const getBrowser = () => {
  let browserName
  const userAgent = navigator.userAgent
  if (RegExp(/chrome|chromium|crios/i).exec(userAgent)) {
    browserName = 'chrome'
  } else if (RegExp(/firefox|fxios/i).exec(userAgent)) {
    browserName = 'firefox'
  } else if (RegExp(/safari/i).exec(userAgent)) {
    browserName = 'safari'
  } else if (RegExp(/edg/i).exec(userAgent)) {
    browserName = 'edge'
  } else {
    browserName = 'No browser detection'
  }
  return browserName
}

export const getBlobErrorMessage = async (error: Blob) => {
  try {
    const stringObj = await error.text()
    return JSON.parse(stringObj)
  } catch (e) {
    return null
  }
}
