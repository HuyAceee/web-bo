import { DeliverySearchProductSelectedValueModel } from '../modal/DeliverySearchProductModel'

export type DeliverySearchProductModalWrapperEmits = (e: 'selectValue', value: DeliverySearchProductSelectedValueModel) => void

export interface DeliverySearchProductModalWrapperProps {
  placeholderInput?: string
  labelButton?: string
  defaultValue?: string
  disabled?: boolean
  customClassInput?: string
  isDisabledOnEmptySearchText?: boolean
}
