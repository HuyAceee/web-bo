import {
  OperatingSiteCategoryDetailModel,
  OperatingSiteCategoryListItemModel,
  OperatingSiteCategoryTreeListItemModel
} from '@/models/views/operating/operatingMangement/OperatingSiteCategoryModel'
import { BaseModelResponse } from '../../BaseModelResponse'

export interface OperatingSiteCategoryListResponse extends BaseModelResponse<OperatingSiteCategoryListItemModel[]> {}
export interface OperatingSiteCategoryDetailResponse extends BaseModelResponse<OperatingSiteCategoryDetailModel> {}
export interface OperatingCheckMenuIdResponse extends BaseModelResponse<boolean> {}

export class OperatingSiteCategoryResponseConverter {
  static helper(arr: OperatingSiteCategoryListItemModel[], menuKey?: string, parentMenuKey?: string): OperatingSiteCategoryListItemModel[] {
    const tmp = arr?.map((node) => {
      return {
        ...node,
        key: node.menuKey,
        class: menuKey === node?.menuKey?.toString() ? 'wf_text-sub-02' : '',
        label: node.menuName,
        children:
          parentMenuKey === node.menuKey?.toString()
            ? [{ class: 'wf_text-sub-02', label: '-', selectable: false } as any, ...this.helper(node.subMenus, menuKey)]
            : this.helper(node.subMenus, menuKey, parentMenuKey)
      }
    })
    return tmp || []
  }

  static buildTreesFromStdOperatingArray(
    categories: OperatingSiteCategoryListItemModel[],
    menuKey?: string,
    parentMenuKey?: string
  ): OperatingSiteCategoryListItemModel[] {
    if (parentMenuKey === '0') {
      return [
        { class: 'wf_text-sub-02', key: 0, label: '-', selectable: false, children: [], menuDepth: 1 } as any,
        ...this.helper(categories, menuKey)
      ]
    } else {
      return this.helper(
        categories.filter((v) => v.menuKey),
        menuKey,
        parentMenuKey
      )
    }
  }

  static helperTree(arr: OperatingSiteCategoryListItemModel[]): OperatingSiteCategoryTreeListItemModel[] {
    return arr.map((node) => ({
      key: node.menuKey,
      data: node,
      children: this.helperTree(node.subMenus)
    }))
  }

  static buildTreeDataOperatingArray(categories: OperatingSiteCategoryListItemModel[]): OperatingSiteCategoryTreeListItemModel[] {
    return this.helperTree(categories.filter((v) => v.menuKey))
  }
}
