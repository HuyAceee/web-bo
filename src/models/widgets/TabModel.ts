export interface TabMangerRecordModel {
  index: number
  currentPath: string
  targetPath: string
}

export interface TabManagerModelExpose {
  onClose: (record?: TabMangerRecordModel) => boolean
}
