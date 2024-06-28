import { ProductStandardCategoryModel } from '@/models'
import { BaseModelResponse, DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { ProductCategoryModel, ProductStandardCategoryListItemModel } from '@/models/views'
import {
  CategoriesExhibitionDspCategoryDetailModel,
  CategoriesExhibitionDspCategoryExceptCompanyModel,
  CategoriesExhibitionDspCategoryListModel,
  CategoriesExhibitionDspCategoryManageResponseModel,
  CategoriesExhibitionLowDspCategoryListModel
} from '@/models/views/categories/exhibition/CategoriesExhibitionInDepth1CategoryModel'
import { TreeNode } from 'primevue/tree'

export interface ProductCategoryResponse extends DataTablePaginationResponseModel<ProductCategoryModel> {}
export interface ProductStandardCategoryResponse extends DataTablePaginationResponseModel<ProductStandardCategoryModel> {}
export interface ProductDspCategoryExceptCompanyResponse
  extends DataTablePaginationResponseModel<CategoriesExhibitionDspCategoryExceptCompanyModel> {}
export interface ProductDspCategoryManageResponse extends BaseModelResponse<CategoriesExhibitionDspCategoryManageResponseModel> {}
export interface ProductLowDspCategoryListResponse extends DataTablePaginationResponseModel<CategoriesExhibitionLowDspCategoryListModel> {}
export interface ProductDspCategoryDetailResponse extends BaseModelResponse<CategoriesExhibitionDspCategoryDetailModel> {}

export interface ProductCategoryResponse extends DataTablePaginationResponseModel<ProductCategoryModel> {}
export interface ProductStandardCategoryResponse extends DataTablePaginationResponseModel<ProductStandardCategoryModel> {}
export interface ProductStandardCategoryListResponse extends BaseModelResponse<ProductStandardCategoryListItemModel[]> {}
export interface ProductDspCategoryListResponse extends BaseModelResponse<CategoriesExhibitionDspCategoryListModel[]> {}

export class ProductCategoryListResponseConverter {
  static addPropertyToTree(tree: TreeNode[], callback: (node: TreeNode) => TreeNode): TreeNode[] {
    return tree.map((node) => {
      const mappedNode = {
        ...callback(node),
        key: node.standardCategoryId,
        label: node.standardCategoryName,
        // data: '',
        children: node.children ? this.addPropertyToTree(node.children, callback) : []
      }

      return mappedNode
    })
  }

  static buildTreesFromStdCategoriesArray(categories: ProductStandardCategoryListItemModel[]): TreeNode[] {
    const map: { [id: string]: ProductStandardCategoryListItemModel } = {}
    const roots: TreeNode[] = []

    categories.forEach((node) => (map[node.standardCategoryId] = { ...node, children: [] }))

    categories.sort((a, b) => Number(b.standardCategoryDisplayOrder) - Number(a.standardCategoryDisplayOrder))

    categories.forEach((node) => {
      if (!node.upperStandardCategoryId) {
        roots.push(map[node.standardCategoryId])
      } else {
        const parent = map[node.upperStandardCategoryId]
        if (parent) {
          parent.children = parent.children || []
          const index = parent.children.findIndex((child) => Number(child.standardCategoryDisplayOrder) > Number(node.standardCategoryDisplayOrder))
          parent.children.splice(index !== -1 ? index : parent.children.length, 0, map[node.standardCategoryId])
          // parent.children.push(map[node.standardCategoryId])
          parent.children.sort((a, b) => Number(a.standardCategoryDisplayOrder) - Number(b.standardCategoryDisplayOrder))
        }
      }
    })

    const mappedTree = this.addPropertyToTree(roots, (node) => ({ ...node }))
    // console.log(mappedTree)
    return mappedTree
  }
}

export class ProductDspCategoryListResponseConverter {
  static addPropertyToTree(tree: TreeNode[], callback: (node: TreeNode) => TreeNode): TreeNode[] {
    return tree.map((node) => {
      const mappedNode = {
        ...callback(node),
        key: node.displayCategoryId,
        label: node.displayCategoryName,
        // data: '',
        children: node.children ? this.addPropertyToTree(node.children, callback) : []
      }

      return mappedNode
    })
  }

  static buildTreesFromDspCategoriesArray(categories: CategoriesExhibitionDspCategoryListModel[]): TreeNode[] {
    const map: { [id: string]: CategoriesExhibitionDspCategoryListModel } = {}
    const roots: TreeNode[] = []

    categories.forEach((node) => (map[node.displayCategoryId] = { ...node, children: [] }))

    categories.sort((a, b) => Number(b.displayCategoryExposureOrder) - Number(a.displayCategoryExposureOrder))

    categories.forEach((node) => {
      if (!node.upperDisplayCategoryId) {
        roots.push(map[node.displayCategoryId])
      } else {
        const parent = map[node.upperDisplayCategoryId]
        if (parent) {
          parent.children = parent.children ?? []
          const index = parent.children.findIndex((child) => Number(child.displayCategoryExposureOrder) > Number(node.displayCategoryExposureOrder))
          parent.children.splice(index !== -1 ? index : parent.children.length, 0, map[node.displayCategoryId])
          parent.children.sort((a, b) => Number(a.displayCategoryExposureOrder) - Number(b.displayCategoryExposureOrder))
          // parent.children.push(map[node.displayCategoryId])
        }
      }
    })

    const mappedTree = this.addPropertyToTree(roots, (node) => ({ ...node }))
    // console.log(mappedTree)
    return mappedTree
  }
}

export class ProductTreeMenuConverter {
  /**
   * Converts a tree structure to an array.
   * @param tree The flat tree structure to convert.
   * @returns An array of nodes without children.
   */
  static flatTreeToOriginalArray<T extends TreeNode>(tree: T[]): Omit<T, 'children'>[] {
    const originalArray: Omit<T, 'children'>[] = []

    const traverse = (node: T) => {
      originalArray.push({ ...node, children: undefined })

      if (node.children) {
        for (const child of node.children) {
          traverse(child as T)
        }
      }
    }

    for (const node of tree) {
      traverse(node)
    }

    return originalArray
  }
}
