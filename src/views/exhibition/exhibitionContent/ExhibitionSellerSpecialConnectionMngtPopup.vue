<!-- BO_I0104_020101_P -->

<script setup lang="ts">
import { HeaderModal, WelfareMdButton } from '@/components'
import ExhibitionConnectionFormBanner from '@/components/exhibition/exhibitionContent/ExhibitionConnectionFormBanner.vue'
import ExhibitionConnectionFormBasicInfo from '@/components/exhibition/exhibitionContent/ExhibitionConnectionFormBasicInfo.vue'
import ExhibitionConnectionFormCategory from '@/components/exhibition/exhibitionContent/ExhibitionConnectionFormCategory.vue'
import ExhibitionConnectionFormMarketingArea from '@/components/exhibition/exhibitionContent/ExhibitionConnectionFormMarketingArea.vue'
import ExhibitionConnectionFormRepresentativeImg from '@/components/exhibition/exhibitionContent/ExhibitionConnectionFormRepresentativeImg.vue'
import { useExhibitionSellerSpecialConnectionMngtPopup } from '@/composables/exhibition/exhibitionContent/useExhibitionSellerSpecialConnectionMngtPopup'
import {
  ExhibitionConnectionFormRepresentativeImgModel,
  ExhibitionConnectionSpecialModalType,
  ExhibitionCornerTableModel,
  ExhibitionSellerSpecialConnectionMngtPopupProps
} from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionMngtModel'
import { ExhibitionConnectionFormMarketingAreaModel } from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionFormMarketingAreaModel'
import { ExhibitionConnectionFormBannerModel } from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionFormBannerModel'

interface ExhibitionSellerSpecialConnectionMngtPopupEmits {
  (e: 'close'): void
}

const props = defineProps<ExhibitionSellerSpecialConnectionMngtPopupProps>()

const emits = defineEmits<ExhibitionSellerSpecialConnectionMngtPopupEmits>()

const closeModal = () => {
  emits('close')
}

const {
  exhibitionBasicInformation,
  exhibitionContentDepthOption,
  onCloseModal,
  formBasicRef,
  formRepresentativeImgRef,
  formMarketingAreaRef,
  formCategoryRef,
  submitValue
} = useExhibitionSellerSpecialConnectionMngtPopup(props, closeModal)
</script>

<template>
  <div class="wf_w-1200 wf_bg-white">
    <HeaderModal title="판매사 기획전 연결 관리" @close-modal="closeModal" />

    <div class="wf-pl-20 wf-py-20 wf-pr-14 wf-modal-wrapper--grow wf-custom-scrollbar">
      <ExhibitionConnectionFormBasicInfo ref="formBasicRef" :data="exhibitionBasicInformation" />

      <ExhibitionConnectionFormRepresentativeImg
        ref="formRepresentativeImgRef"
        :data="exhibitionBasicInformation as ExhibitionConnectionFormRepresentativeImgModel"
        :config="ExhibitionConnectionSpecialModalType.seller"
        class="wf-mt-20"
      />

      <ExhibitionConnectionFormMarketingArea
        ref="formMarketingAreaRef"
        :data="exhibitionBasicInformation as ExhibitionConnectionFormMarketingAreaModel"
        :config="ExhibitionConnectionSpecialModalType.seller"
        class="wf-mt-20"
      />

      <ExhibitionConnectionFormBanner
        ref="formBannerRef"
        :options="exhibitionContentDepthOption"
        :data="exhibitionBasicInformation as ExhibitionConnectionFormBannerModel"
        :config="ExhibitionConnectionSpecialModalType.seller"
        class="wf-mt-20"
      />

      <ExhibitionConnectionFormCategory
        ref="formCategoryRef"
        :data="exhibitionBasicInformation as ExhibitionCornerTableModel"
        :config="ExhibitionConnectionSpecialModalType.seller"
        class="wf-mt-20"
      />

      <div class="wf_flex wf_justify-center">
        <WelfareMdButton label="닫기" buttonType="cancel" class="wf_w-120" @on-click="onCloseModal" />
        <WelfareMdButton label="저장" buttonType="default" class="wf_w-120 wf-ml-4" @on-click="submitValue" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/exhibition/common/exhibition-common.css');
</style>
