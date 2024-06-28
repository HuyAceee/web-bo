import { AddressModel } from "@/models/common"

export interface FormAddressProps {
  modelValue: AddressModel
  postCodePlaceholder?: string
  loadNameAddressPlaceholder?: string
  detailAddressPlaceholder?: string
  revertDetailAddress?: boolean
}

export type FormAddressEmits = (e: 'update:modelValue', value: AddressModel) => void
