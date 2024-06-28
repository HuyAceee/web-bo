import { DataTableContainerConfigModel } from '@/models'
import { ProductHeaderTableOptionModel, ProductWarningModel } from '@/models/views/products'

export interface ProductTicketDataFileModel {
  id?: number
  name: string
  url: string
  alt?: string
  key?: number
  productKey?: number
  imageRepresentativeYn?: string
  originName?: string
  fileType?: string
  file?: any
  productRequestKey?: number
  productRequestAttachFileKey?: number
  newData?: any
  isNewImg?: string
  urlReview?: string
}

export type ProductTicketFileType = 'video' | 'img'

export interface ProductRepresentativeProps {
  label: string
  notifications: ProductWarningModel[]
  configHeader?: DataTableContainerConfigModel[]
  dataTable: ProductTicketDataFileModel[]
  typeFile?: ProductTicketFileType
  headers: ProductHeaderTableOptionModel[]
  paramsCallBack?: string
  onUpdateNewImage?: (value: any, key: number, alt?: string) => void
}

export const ProductTicketImageTableInformation: DataTableContainerConfigModel[] = [
  {
    header: '번호',
    field: 'id',
    class: ''
  },
  {
    header: '대표 여부',
    field: 'imageRepresentativeYn',
    class: ''
  },
  {
    header: '파일명',
    field: 'name',
    class: ''
  },
  {
    header: '등록',
    field: 'action',
    class: ''
  }
]

export const ProductTicketVideoTableInformation: DataTableContainerConfigModel[] = [
  {
    header: '번호',
    field: 'id',
    class: ''
  },
  {
    header: '파일명',
    field: 'name',
    class: ''
  },
  {
    header: '등록',
    field: 'action',
    class: ''
  }
]
