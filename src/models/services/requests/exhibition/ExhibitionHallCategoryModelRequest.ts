import { ExhibitionContentHallCategoryLowerFormItemModel } from "@/models/views/exhibition/exhibitionContent/ExhibitionContentHallCategoryModel";

export interface ExhibitionHallCategoryRegisLowerListModelRequest {
  createRequestList: ExhibitionContentHallCategoryLowerFormItemModel[]
}

export interface ExhibitionHallCategoryDeleteDataLowerModelRequest {
  sclassCode: string
  lclassCode: string
  customerId: string
}