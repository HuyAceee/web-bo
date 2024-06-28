import { DataTableContainerConfigModel } from '@/models/uikit/WelfareDataTableProps'
import { FilterResult } from '@/models/common'
import { read, writeFile, utils, ColInfo, WorkSheet } from 'xlsx'
import { ObjectSchema } from 'yup'
import { filterDuplicateField, getLastKeyByValue, sortObjectFields, convertNestedArraysToObject } from './common'
import { ALL_COMMON_MESSAGES } from './validation/errorMessages'

export const exportExcel = async <T extends Record<string, any>>(
  data: T[],
  sheetName: string,
  recordHeader?: string[],
  minimumColumnWidth: number = 12,
  options?: {
    customHeader?: (worksheet: WorkSheet) => void
  }
) => {
  const stringData: string[][] = data.map((row) => Object.values(row).map((value) => String(value)))
  const worksheet = utils.json_to_sheet(stringData)
  const maxColumnWidths: number[] = []

  if (recordHeader && !options?.customHeader) {
    utils.sheet_add_aoa(worksheet, [recordHeader], { origin: 'A1' })
  } else if (options?.customHeader) {
    options.customHeader(worksheet)
  }


  // Customize header style

  /**    const headerStyle = { font: { bold: true, color: { rgb: 'FF0000' } } }
  worksheet['!header'] = headerStyle */

  // Customize border style for all cells and rows

  /**   const borderStyle = {
    top: { style: 'thin', color: { rgb: '000000' } },
    bottom: { style: 'thin', color: { rgb: '000000' } },
    left: { style: 'thin', color: { rgb: '000000' } },
    right: { style: 'thin', color: { rgb: '000000' } }
  }
  const range = worksheet['!ref']
  if (range) {
    const rangeRef = utils.decode_range(range)
    for (let R = rangeRef.s.r; R <= rangeRef.e.r; ++R) {
      for (let C = rangeRef.s.c; C <= rangeRef.e.c; ++C) {
        const cellAddress: CellAddress = { r: R, c: C }
        worksheet[utils.encode_cell(cellAddress)].s = borderStyle
      }
    }
  } */

  // Find the maximum width of each column, minimum width is {minimumColumnWidth}
  data.forEach((row) => {
    Object.keys(row).forEach((key, index) => {
      const cellContent = String(row[key])
      const cellLength = cellContent.length || 1
      maxColumnWidths[index] = Math.max(maxColumnWidths[index] || minimumColumnWidth, cellLength)
    })
  })

  // Set the calculated maximum width for each column
  const columnWidths: ColInfo[] = maxColumnWidths.map((maxWidth) => ({ wch: maxWidth }))

  // Apply the column widths to the worksheet
  worksheet['!cols'] = columnWidths

  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, worksheet, sheetName)
  writeFile(workbook, `${sheetName}.xlsx`)
}

export const parseExcelArrayData = async (file: File, skipHeader = true) => {
  const reader = new FileReader()
  const parseDataPromise = new Promise<any[][]>((resolve, reject) => {
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer)
      const workbook = read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      let parseData: any[][] = utils.sheet_to_json(worksheet, { header: 1, range: skipHeader ? 1 : 0 })
      parseData = parseData.filter((it) => it.length)
      resolve(parseData)
    }

    reader.onerror = (event) => {
      reject(event.target?.error)
    }
  })

  reader.readAsArrayBuffer(file)

  return await parseDataPromise
}

export const readAndValidateExcelFile = async (
  file: File,
  headerFields: string[],
  validationSchema: ObjectSchema<any>,
  options?: {
    duplicatedFieldCheck?: number
    duplicatedErrorMessage?: string
    refusedFieldName?: string
    addIdField: boolean
    skipHeader: boolean
  }
): Promise<FilterResult<any>> => {
  const data = await parseExcelArrayData(file, options?.skipHeader)

  const { validItems, invalidItems } = validateData(
    data,
    headerFields,
    validationSchema,
    options?.duplicatedFieldCheck,
    options?.duplicatedErrorMessage,
    options?.refusedFieldName
  )

  if (options?.addIdField) {
    validItems.forEach((it, idx) => {
      it.id = idx + 1
    })
    invalidItems.forEach((it, idx) => {
      it.id = idx + 1
    })
  }
  return {
    validItems: validItems,
    invalidItems: invalidItems
  }
}

const validateData = <T extends Iterable<any>>(
  data: T[],
  headerFields: string[],
  validationSchema: ObjectSchema<any>,
  duplicatedFieldCheck?: number,
  duplicatedErrorMessage?: string,
  refusedFieldName?: string
): FilterResult<Record<string, any>> => {
  const validItems: any[] = []
  const invalidItems: any[] = []

  if (duplicatedFieldCheck) {
    const { validItems: validList, invalidItems: invalidList } = filterDuplicateField(data, duplicatedFieldCheck)
    validItems.push(...validList)
    invalidItems.push(...invalidList.map((it) => [...it, duplicatedErrorMessage]))
  } else {
    validItems.push(...data)
  }

  const validateItem = (item: any) => {
    try {
      validationSchema.validateSync(item, { abortEarly: false })
      return true
    } catch (error: any) {
      return error
    }
  }

  const convertedValidItems = convertNestedArraysToObject(validItems, headerFields)
  const convertedInvalidItems = convertNestedArraysToObject(invalidItems, headerFields)

  let failedList: any = []
  if (refusedFieldName) {
    failedList = convertedInvalidItems.map((item) => {
      const valid = validateItem(item)
      if (valid === true) {
        // if the object has no validation errors but is duplicated
        const lastKey = getLastKeyByValue(item)
        const reasonRefused = item[lastKey]
        item[lastKey] = ''
        item[refusedFieldName] = reasonRefused
        return item
      } else {
        // if the object has validation errors
        const lastKey = getLastKeyByValue(item)
        item[lastKey] = ''
        const itemWithReason = { ...item }
        itemWithReason[refusedFieldName] = valid.errors[0].toString() ? valid.errors[0].toString() : ALL_COMMON_MESSAGES.MISSING_REQUIRED_DATA
        return itemWithReason
      }
    })
  } else {
    failedList = convertedInvalidItems
  }
  const successList = convertedValidItems.filter((item) => {
    const valid = validateItem(item)
    if (valid === true) {
      return item
    } else {
      const itemWithReason = { ...item }
      if (refusedFieldName) {
        itemWithReason[refusedFieldName] = valid.errors[0].toString() ? valid.errors[0].toString() : ALL_COMMON_MESSAGES.MISSING_REQUIRED_DATA
      }
      failedList.push(itemWithReason)
    }
  })

  return {
    validItems: successList,
    invalidItems: failedList
  }
}

export const renderSortDataTable = <T extends Record<string, any>>(data: T[], headerTableConfig: DataTableContainerConfigModel[]) => {
  const fieldList = headerTableConfig.map((item) => item.field)
  const dataTable = data.map((item) => {
    return sortObjectFields<T>(item, fieldList)
  })
  return dataTable
}
