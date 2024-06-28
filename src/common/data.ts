export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

/**
 * format size of file in bytes to MB
 * @param sizeInBytes the file size in bytes
 * @param fixedNumber number of decimals display
 */
export const validateSizeMB = (sizeInBytes?: number, fixedNumber: number = 1) => {
  if (!sizeInBytes) return ''
  return `(${(sizeInBytes / (1024 * 1024)).toFixed(fixedNumber)}MB)`
}

/**
 * format name and file size in bytes to MB
 * @param name the file name want to display
 * @param sizeInBytes the file size in bytes
 * @param limitDecimal number of decimals display
 */
export const formatFileNameSize = (name?: string, sizeInBytes?: number, limitDecimal: number = 1) => {
  return `${name ?? ''} ${validateSizeMB(sizeInBytes, limitDecimal)}`
}
