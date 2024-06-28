<!-- BO_I0102_030101 -->

<script setup lang="ts">
import {
  CommonTable,
  CommonTableContentCell,
  CommonTableRow,
  CommonTableTitleCell,
  WelfareCheckbox,
  WelfareInputText,
  WelfareMdButton,
  WelfareRadioGroup,
  WelfareSelect
} from '@/components'
import FormGroupInputColor from '@/components/widgets/form/FormGroupInputColor.vue'
import { ref } from 'vue'
const useExhibitionHallMngtBaseInfoTab = () => {
  const exhibitionStatusOptions = [
    {
      label: '전시',
      value: 1
    },
    {
      label: '비전시',
      value: 2
    }
  ]

  const useMoreOptions = [
    {
      label: '사용',
      value: 1
    },
    {
      label: '미사용',
      value: 2
    }
  ]

  const connerDesignOptions = [
    {
      label: '사용',
      value: 1
    },
    {
      label: '미사용',
      value: 2
    }
  ]

  const roundThicknessOptions: any[] = [
    // {
    //   label: '사용',
    //   value: 1
    // }
  ]

  return { exhibitionStatusOptions, useMoreOptions, connerDesignOptions, roundThicknessOptions }
}

const testColor = ref('#4075f3')

const { exhibitionStatusOptions, useMoreOptions, connerDesignOptions, roundThicknessOptions } = useExhibitionHallMngtBaseInfoTab()
</script>

<template>
  <div>
    <CommonTable>
      <CommonTableRow>
        <CommonTableTitleCell is-first-col title="코너번호" />
        <CommonTableContentCell></CommonTableContentCell>
        <CommonTableTitleCell title="코너명" />
        <CommonTableContentCell></CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell is-first-col title="카테고리 코드" />
        <CommonTableContentCell></CommonTableContentCell>
        <CommonTableTitleCell title="카테고리명" />
        <CommonTableContentCell></CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell is-first-col title="전시여부" />
        <CommonTableContentCell>
          <WelfareRadioGroup size="sm" :options="exhibitionStatusOptions" name="exhibitionStatus" :model-value="1" />
        </CommonTableContentCell>
        <CommonTableTitleCell title="더보기 사용" />
        <CommonTableContentCell>
          <WelfareRadioGroup size="sm" :options="useMoreOptions" name="useMore" :model-value="1" />
        </CommonTableContentCell>
      </CommonTableRow>

      <!-- conner design area -->
      <CommonTableRow>
        <CommonTableTitleCell is-first-col title="코너 디자인" required />
        <CommonTableContentCell>
          <div class="wf_flex wf-space-x-20">
            <WelfareRadioGroup size="sm" :options="connerDesignOptions" name="connerDesign" :model-value="1" />
            <WelfareMdButton button-size="small" button-type="liner" label="미리보기" disabled />
          </div>
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow v-if="true">
        <CommonTableTitleCell is-first-col title="라운드 굵기" required />
        <CommonTableContentCell>
          <WelfareSelect class="wf_w-180" small placeholder="선택 안함" option-label="label" option-value="value" :options="roundThicknessOptions" />
        </CommonTableContentCell>
        <CommonTableTitleCell title="라운드 컬러" required />
        <CommonTableContentCell>
          <FormGroupInputColor v-model="testColor" />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow v-if="true">
        <CommonTableTitleCell is-first-col title="배경 이미지" />
        <CommonTableContentCell>
          <div class="wf_w-full wf_flex wf-space-x-6">
            <WelfareInputText class="wf_flex-1" size="small" placeholder="이미지 선택" />
            <WelfareMdButton button-type="liner" button-size="small" label="삭제" />
          </div>
        </CommonTableContentCell>
        <CommonTableTitleCell title="배경 컬러" required />
        <CommonTableContentCell>
          <FormGroupInputColor v-model="testColor" />
        </CommonTableContentCell>
      </CommonTableRow>

      <!-- exhibition type area -->
      <CommonTableRow :is-last-row="false">
        <CommonTableTitleCell is-first-col title="전시 성격" />
        <CommonTableContentCell>
          <div class="wf_flex wf-space-x-20">
            <WelfareCheckbox size="sm" label="상품" />
            <WelfareCheckbox size="sm" label="배너" />
            <WelfareCheckbox size="sm" label="상품그룹" />
            <WelfareCheckbox size="sm" label="특가" />
            <WelfareCheckbox size="sm" label="텍스트" />
          </div>
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow v-if="false" height="83" is-last-row>
        <CommonTableTitleCell is-first-col title="상품 전시 유형" required />
        <CommonTableContentCell>
          <div>
            <div class="wf_flex wf_items-center wf-body_03-reg">
              <WelfareCheckbox size="sm" label="PC" />
              <WelfareSelect class="wf-ml-20 wf_w-180" small placeholder="선택" />
              <span class="wf-ml-12">최대</span>
              <WelfareInputText class="wf-ml-6 wf_w-180" size="small" placeholder="입력" />
              <span class="wf-ml-6">까지 노출</span>
            </div>
            <div class="wf-mt-10 wf_flex wf_items-center wf-body_03-reg">
              <WelfareCheckbox size="sm" label="모바일" />
              <span class="wf-ml-20">최대</span>
              <WelfareInputText class="wf-ml-6 wf_w-180" size="small" placeholder="입력" />
              <span class="wf-ml-6">까지 노출</span>
            </div>
          </div>
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow v-if="false" height="42" is-last-row>
        <CommonTableTitleCell is-first-col title="상품그룹 전시유형" required />
        <CommonTableContentCell>
          <div class="wf_flex wf_items-center wf-body_03-reg">
            <WelfareCheckbox size="sm" label="PC" />
            <WelfareInputText class="wf-ml-20 wf_w-180" size="small" placeholder="입력" />
            <WelfareCheckbox class="wf-ml-20" size="sm" label="모바일" />
            <span class="wf-ml-20">최대</span>
            <WelfareInputText class="wf-ml-6 wf_w-180" size="small" placeholder="입력" />
          </div>
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow v-if="false" height="83" is-last-row>
        <CommonTableTitleCell is-first-col title="상품그룹 전시유형" required />
        <CommonTableContentCell>
          <div>
            <div class="wf_flex wf_items-center wf-body_03-reg">
              <span>상품그룹 - 배너</span>
              <WelfareCheckbox class="wf-ml-20" size="sm" label="PC" />
              <WelfareInputText class="wf-ml-20 wf_w-180" size="small" placeholder="입력" />
              <WelfareCheckbox class="wf-ml-20" size="sm" label="모바일" />
              <WelfareInputText class="wf-ml-20 wf_w-180" size="small" placeholder="입력" />
            </div>
            <div class="wf-mt-10 wf_flex wf_items-center wf-body_03-reg">
              <span>상품그룹 - 상품</span>
              <WelfareCheckbox class="wf-ml-20" size="sm" label="PC" />
              <WelfareInputText class="wf-ml-20 wf_w-180" size="small" placeholder="입력" />
              <WelfareCheckbox class="wf-ml-20" size="sm" label="모바일" />
              <WelfareInputText class="wf-ml-20 wf_w-180" size="small" placeholder="입력" />
            </div>
          </div>
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow v-if="true" height="42" is-last-row>
        <CommonTableTitleCell is-first-col title="특가 전시 유형" required />
        <CommonTableContentCell>
          <div class="wf_flex wf_items-center wf-body_03-reg">
            <WelfareCheckbox size="sm" label="PC" />
            <span class="wf-ml-20">최대</span>
            <WelfareInputText class="wf-ml-8 wf_w-180" size="small" placeholder="입력" />
            <span class="wf-ml-6">까지 노출</span>
            <WelfareCheckbox class="wf-ml-20" size="sm" label="모바일" />
            <span class="wf-ml-20">최대</span>
            <WelfareInputText class="wf-ml-8 wf_w-180" size="small" placeholder="입력" />
            <span class="wf-ml-6">까지 노출</span>
          </div>
        </CommonTableContentCell>
      </CommonTableRow>
    </CommonTable>
  </div>
</template>
