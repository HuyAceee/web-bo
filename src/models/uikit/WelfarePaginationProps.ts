import { PageState, PaginatorProps } from 'primevue/paginator'

export interface WelfarePaginationProps extends PaginatorProps {}

export interface WelfarePaginationEmits {
  (e: 'update:first', value: number): void
  (e: 'update:rows', value: number): void
  (e: 'page', event: PageState): void
}

export interface PaginationParamsModel {
  page: number
  size: number
}

export const defaultPageState: PageState = {
  first: 0,
  rows: 0,
  page: 0,
  pageCount: 0
}
