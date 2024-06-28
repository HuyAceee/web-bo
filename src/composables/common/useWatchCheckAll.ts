import { YnOptions } from "@/models"
import { watch } from "vue"

export const useWatchCheckAll = (objectRef: any, config: {
  setFieldValue: (field: any, value: YnOptions) => void
  checkAllKeyDependency: string
  checkListKeyDependencies: string[]
}) => {
  const { setFieldValue, checkAllKeyDependency, checkListKeyDependencies } = config

  watch(() => objectRef[checkAllKeyDependency], (v) => {
    if (v === YnOptions.Y) {
      checkListKeyDependencies.forEach((key) => setFieldValue(key, v))
    } else {
      const isUncheckAll = !checkListKeyDependencies.map((key) => objectRef[key]).some(_v => _v === YnOptions.N)
      if (isUncheckAll) {
        checkListKeyDependencies.forEach((key) => setFieldValue(key, v))
      }
    }
  })

  watch(() => checkListKeyDependencies.map((key) => objectRef[key]), (arr) => {
    const isCheckAll = !arr.some((v) => v === YnOptions.N)
    setFieldValue(checkAllKeyDependency, isCheckAll ? YnOptions.Y : YnOptions.N)
  })
}