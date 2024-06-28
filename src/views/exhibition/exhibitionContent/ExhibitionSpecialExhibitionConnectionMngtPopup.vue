<!-- BO_I0103_020101_P -->
<script lang="ts" setup>
import { HeaderModal, WelfareMdButton } from '@/components'
import ExhibitionConnectionFormBanner from '@/components/exhibition/exhibitionContent/ExhibitionConnectionFormBanner.vue'
import ExhibitionConnectionFormCategory from '@/components/exhibition/exhibitionContent/ExhibitionConnectionFormCategory.vue'
import ExhibitionConnectionFormMarketingArea from '@/components/exhibition/exhibitionContent/ExhibitionConnectionFormMarketingArea.vue'
import ExhibitionConnectionFormRepresentativeImg from '@/components/exhibition/exhibitionContent/ExhibitionConnectionFormRepresentativeImg.vue'
import ExhibitionSpecialConnectionFormBasicInfo from '@/components/exhibition/exhibitionContent/ExhibitionSpecialConnectionFormBasicInfo.vue'
import { useExhibitionSpecialConnectionManagementPopup } from '@/composables/exhibition/exhibitionContent/useExhibitionSpecialConnectionManagementPopup'
import { ExhibitionConnectionFormBannerModel } from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionFormBannerModel'
import { ExhibitionConnectionFormMarketingAreaModel } from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionFormMarketingAreaModel'
import {
  ExhibitionConnectionFormRepresentativeImgModel,
  ExhibitionConnectionSpecialModalType,
  ExhibitionCornerTableModel
} from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionMngtModel'
import { ExhibitionSpecialConnectionFormBasicInfoModel } from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialConnectionFormBasicInfoModel'
import {
  ExhibitionContentSpecialConnectionManagementPopupEmits,
  ExhibitionContentSpecialConnectionManagementPopupProps
} from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialConnectionManagementModel'

const props = defineProps<ExhibitionContentSpecialConnectionManagementPopupProps>()

const emits = defineEmits<ExhibitionContentSpecialConnectionManagementPopupEmits>()
const closeModal = () => {
  emits('close')
}

const {
  currentValue,
  exhibitionContentDepthOption,
  onCloseModal,
  formBasicRef,
  formRepresentativeImgRef,
  formMarketingAreaRef,
  formBannerRef,
  formCategoryRef,
  onSubmitValue
} = useExhibitionSpecialConnectionManagementPopup(props, closeModal)
</script>

<template>
  <div class="wf_w-1200 wf_bg-white">
    <HeaderModal title="기획전 연결 관리" @close-modal="closeModal" />
    <div class="wf-pl-20 wf-py-20 wf-pr-14 wf-modal-wrapper--grow wf-custom-scrollbar">
      <ExhibitionSpecialConnectionFormBasicInfo ref="formBasicRef" :data="currentValue as ExhibitionSpecialConnectionFormBasicInfoModel" />

      <ExhibitionConnectionFormRepresentativeImg
        ref="formRepresentativeImgRef"
        :data="currentValue as ExhibitionConnectionFormRepresentativeImgModel"
        :config="ExhibitionConnectionSpecialModalType.special"
        class="wf-mt-20"
      />

      <ExhibitionConnectionFormMarketingArea
        ref="formMarketingAreaRef"
        :data="currentValue as ExhibitionConnectionFormMarketingAreaModel"
        :config="ExhibitionConnectionSpecialModalType.special"
        class="wf-mt-20"
      />

      <ExhibitionConnectionFormBanner
        ref="formBannerRef"
        :data="currentValue as ExhibitionConnectionFormBannerModel"
        :options="exhibitionContentDepthOption"
        :config="ExhibitionConnectionSpecialModalType.special"
        class="wf-mt-20"
      />

      <ExhibitionConnectionFormCategory
        ref="formCategoryRef"
        :data="currentValue as ExhibitionCornerTableModel"
        :config="ExhibitionConnectionSpecialModalType.special"
        class="wf-mt-20"
      />

      <div class="wf-mt-20 wf_flex wf_items-center wf_justify-center wf-space-x-4">
        <WelfareMdButton class="wf_w-120" label="닫기" button-size="default" button-type="cancel" @on-click="onCloseModal" />
        <WelfareMdButton class="wf_w-120" label="저장" button-size="default" button-type="default" @on-click="onSubmitValue" />
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/exhibition/common/exhibition-common.css');
</style>
