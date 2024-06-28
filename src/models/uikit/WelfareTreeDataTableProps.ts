import { DataTableProps } from 'primevue/datatable'
import { DataTableContainerConfigModel } from './WelfareDataTableProps'

export interface WelfareTreeDataTableProps extends DataTableProps {
  columnConfigs?: DataTableContainerConfigModel[]
}
