export interface HTMLListModel {
  title: string
  visible: boolean
  contents: HTMLListItemModel[]
}

export interface HTMLListItemModel {
  title: string
  description: string
  link: string
  history: string
  visible?: boolean
}
