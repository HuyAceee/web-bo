<script setup lang="ts">
import { TextInputValidationMaxBytes, WelfareMdButton, WelfareRadio } from '@/components'
import { icRemoveImage } from '@/assets'
import { useProductModalChangeImage } from '@/composables/products/ticketProduct/baseInfo/useProductModalChangeImage'
import { ProductRegisterValueOptionType, ProductSelectDefinitionType } from '@/models'
import { reactive } from 'vue'
import {
  CategoriesExhibitionDataImageModel,
  CategoriesExhibitionDspCategoryDetailModel
} from '@/models/views/categories/exhibition/CategoriesExhibitionInDepth1CategoryModel'
import { getImageUrlFrom } from '@/common/imageUtils'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
interface ExhibitionDspCategoryDetailProps {
  valueData: CategoriesExhibitionDspCategoryDetailModel
}

interface CategoriesExhibitionFormsInDepthCategoryOneEmits {
  (e: 'update-image', newValue: CategoriesExhibitionDataImageModel): void
  (e: 'update-value-option', valueOption: ProductRegisterValueOptionType): void
  (e: 'remove-image', imagePathName: string, imageName: string, displayCategoryId: string): void
}

const props = defineProps<ExhibitionDspCategoryDetailProps>()
const emit = defineEmits<CategoriesExhibitionFormsInDepthCategoryOneEmits>()

const value = reactive<CategoriesExhibitionDspCategoryDetailModel>(props.valueData)

const handleUpdateImage = (value: CategoriesExhibitionDataImageModel) => {
  emit('update-image', value)
}

const { onShowModal } = useProductModalChangeImage()

const getFile = (value: CategoriesExhibitionDataImageModel) => {
  handleUpdateImage(value)
}

const handleChooseImage = () => {
  onShowModal({
    name: props.valueData.displayCategoryImageName ?? '',
    alt: props.valueData.displayCategoryImageAltName ?? '',
    events: { getFile },
    type: ProductSelectDefinitionType.CATEGORY
  })
}

const handleValueOption = (valueOption: ProductRegisterValueOptionType) => {
  emit('update-value-option', valueOption)
}

const handleRemoveImage = (imagePathName: string, imageName: string, displayCategoryId: string) => {
  if (value.displayCategoryExposureYn !== ProductRegisterValueOptionType.use) {
    emit('remove-image', imagePathName, imageName, displayCategoryId)
  }
}
</script>

<template>
  <div class="wf-mt-26">
    <p class="wf-body_01-semi wf_text-n-33">| 카테고리 정보 / (1) Depth</p>
    <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-12">
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="분류">
          <span class="wf-body_03-reg wf_text--14 wf_text-n-33"
            >{{ value.displayCategoryDepthName !== '' ? value.displayCategoryDepthName : `대분류` }}
          </span>
        </FormGroup>
        <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" is-border-left label="위치">
          <span class="wf-body_03-reg wf_text--14 wf_text-n-33">{{ value.upperDisplayCategoryName }}</span>
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11 wf-pr-12" is-rounded-bottom label="카테고리명" required>
          <TextInputValidationMaxBytes
            v-model="value.displayCategoryName"
            size="small"
            placeholder="한글 기준 30자 이내로 입력하세요."
            class="wf_flex-1"
            :max-bytes="60"
            :disabled="value.displayCategoryExposureYn === ProductRegisterValueOptionType.use"
          />
        </FormGroup>
      </div>
      <div class="wf_flex wf-btn-border-b--ncc wf_h-141">
        <div class="wf_flex wf_flex-1 wf_w-full">
          <div
            class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-141 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
          >
            카테고리 이미지
          </div>
          <div class="wf_flex wf_justify-start wf_h-141 wf-px-12 wf-py-14 wf-body_03-reg wf_text--14 wf_flex-1-0-0">
            <div class="wf_flex-1 wf_flex-col">
              <div class="wf-mb-10">
                <WelfareMdButton
                  label="파일선택"
                  buttonType="liner"
                  :button-size="'small'"
                  @on-click="handleChooseImage"
                  :disabled="value.displayCategoryExposureYn === ProductRegisterValueOptionType.use"
                />
              </div>
              <div class="wf-card-image" v-if="props.valueData.displayCategoryImagePathName">
                <img :src="getImageUrlFrom({ dirFileName: props.valueData.displayCategoryImagePathName })" alt="image" class="wf-image" />
                <div class="wf-icon-delete">
                  <img
                    :src="icRemoveImage"
                    alt="close"
                    :class="value.displayCategoryExposureYn !== ProductRegisterValueOptionType.use && 'wf-pointer'"
                    @click="
                      () =>
                        handleRemoveImage(
                          props.valueData.displayCategoryImagePathName ?? '',
                          props.valueData.displayCategoryImageName ?? '',
                          props.valueData.displayCategoryId ?? ''
                        )
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
        <div class="wf_flex wf_flex-1 wf_w-full">
          <div
            class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
          >
            alt 텍스트
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-py-14 wf-body_03-reg wf_text--14 wf_flex-1-0-0">
            <div class="wf_items-center wf-space-x-4 wf_flex-1">
              <TextInputValidationMaxBytes
                size="small"
                placeholder="팝업에서 등록한 alt 텍스트가 노출됩니다."
                class="wf_flex-1"
                disabled
                :model-value="props.valueData.displayCategoryImageAltName"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="wf_flex wf_h-44">
        <div class="wf_flex wf_flex-1 wf_w-full">
          <div
            class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
          >
            전시 여부 &nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-py-14 wf-body_03-reg wf_text--14 wf_flex-1-0-0">
            <div class="wf_flex wf_flex-1">
              <WelfareRadio
                :model-value="props.valueData.displayCategoryExposureYn"
                @update:model-value="handleValueOption"
                :value="ProductRegisterValueOptionType.use"
                label="전시"
                name="radio-la-sm"
                size="sm"
              />
              <WelfareRadio
                :model-value="props.valueData.displayCategoryExposureYn"
                @update:model-value="handleValueOption"
                :value="ProductRegisterValueOptionType.notUsed"
                class="wf-ml-19"
                label="비전시"
                name="radio-la-sm"
                size="sm"
              />
            </div>
            <p class="text-row-2-warning">*수정은 비전시 상태로 변경 후 가능합니다.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/categories/exhibition/categories-exhibition-in-depth-category.css');
</style>
