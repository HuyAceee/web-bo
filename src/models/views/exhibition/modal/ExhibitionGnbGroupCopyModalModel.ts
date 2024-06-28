export interface ExhibitionGnbGroupCopyModalProps {
  onCancel?: () => void
  onSelect?: () => void
}

export interface ExhibitionGnbGroupCopyTargetCustomersModalModel {
  id: string
  customerCompanyCode: string
  customerCompanyName: string
}

export interface ExhibitionGnbGroupCopyTopCategoryModalModel {
  id: string
  parentCategoryCode: string
  parentCategoryName: string
}

export interface ExhibitionGnbGroupListSubsectionsModalModel {
  id: string
  subcategoryName: string
  subcategoryCode: string
}

export interface ExhibitionGnbGroupCopyDetailModalModel {
  customerKey: string
  targetCustomers: ExhibitionGnbGroupCopyTargetCustomersModalModel[]
  topCategoryList: ExhibitionGnbGroupCopyTopCategoryModalModel[]
  subCategoryList: ExhibitionGnbGroupListSubsectionsModalModel[]
}

export const exhibitionGnbGroupModalTableHeaderConfig = [
  { header: '고객사코드', field: 'customerCompanyCode', class: 'wf_m-w-400' },
  { header: '고객사', field: 'customerCompanyName', class: 'wf_m-w-400' }
]

export const exhibitionGnbTopGroupModalTableHeaderConfig = [
  { header: 'No.', field: 'no', class: 'wf_m-w-100' },
  { header: '상위 카테고리명', field: 'parentCategoryName', class: 'wf_m-w-500' },
  { header: '복사 여부', field: 'copyYn', class: 'wf_m-w-200' }
]

export const exhibitionGnbChildGroupModalTableHeaderConfig = [
  { header: 'No.', field: 'no', class: 'wf_m-w-100' },
  { header: '하위 카테고리명', field: 'subcategoryName', class: 'wf_m-w-500' },
  { header: '복사 여부', field: 'copyYn', class: 'wf_m-w-200' }
]

export const exhibitionGnbGroupDefaultFakeData = {
  customerKey: '',
  targetCustomers: [
    {
      id: '1',
      customerCompanyCode: 'C1234',
      customerCompanyName: '메가존 클라우드'
    },
    {
      id: '2',
      customerCompanyCode: 'C1235',
      customerCompanyName: '메가존 클라우드2'
    }
  ],
  topCategoryList: [
    {
      id: '1',
      parentCategoryCode: 'GNB1',
      parentCategoryName: 'GNB1'
    },
    {
      id: '2',
      parentCategoryCode: 'GNB2',
      parentCategoryName: 'GNB2'
    }
  ],
  subCategoryList: [
    {
      id: '1',
      subcategoryName: '서브페이지1',
      subcategoryCode: '1'
    },
    {
      id: '2',
      subcategoryName: '서브페이지2',
      subcategoryCode: '2'
    }
  ]
}
