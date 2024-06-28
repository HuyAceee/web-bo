<!--  -->

<script setup lang="ts">
import {
  CommonTable,
  CommonTableContentCell,
  CommonTableRow,
  CommonTableTitleCell,
  WelfareInputText,
  WelfareMdButton,
  WelfareRadioGroup,
  WelfareSelect
} from '@/components'
import ExhibitionHallMngtDetailedReservationTable from '@/components/exhibition/exhibitionContent/ExhibitionHallMngtDetailedReservationTable.vue'

const useExhibitionHallMngtDetailedInfo = () => {
  const criteriaOptions = [
    {
      label: '전시순서',
      value: 1
    },
    {
      label: '판매량 순',
      value: 2
    },
    {
      label: '낮은가격순',
      value: 3
    },
    {
      label: '높은가격순',
      value: 4
    },
    {
      label: '신상품순',
      value: 5
    },
    {
      label: '추천순',
      value: 6
    }
  ]

  const seeMoreOptions = [
    {
      label: '링크사용',
      value: 1
    },
    {
      label: '기획전',
      value: 2
    },
    {
      label: '이벤트',
      value: 3
    },
    {
      label: '상품',
      value: 4
    },
    {
      label: '프로모션',
      value: 5
    },
    {
      label: '외부링크',
      value: 6
    },
    {
      label: '링크없음',
      value: 7
    }
  ]

  return { criteriaOptions, seeMoreOptions }
}

const { criteriaOptions, seeMoreOptions } = useExhibitionHallMngtDetailedInfo()
</script>

<template>
  <div>
    <CommonTable>
      <CommonTableRow :height="false ? 44 : 84">
        <CommonTableTitleCell title="상품정렬 기준" is-first-col />
        <CommonTableContentCell>
          <div class="wf_w-full">
            <div class="wf_flex wf_justify-between">
              <WelfareRadioGroup size="sm" :options="criteriaOptions" />
              <WelfareMdButton button-size="small" label="저장" button-type="liner" />
            </div>
            <div class="wf-mt-10">
              <WelfareInputText size="small" placeholder=" " />
            </div>
          </div>
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="42" is-last-row>
        <CommonTableTitleCell title="더보기" is-first-col required />
        <CommonTableContentCell>
          <div class="wf_w-full wf_flex">
            <WelfareSelect class="wf-mr-6 wf_w-180" small option-label="label" option-value="value" :options="seeMoreOptions" placeholder="선택" />
            <WelfareInputText class="wf_w-180 wf-mr-4" placeholder=" " size="small" />
            <WelfareInputText class="wf_flex-1" placeholder=" " size="small" />
            <WelfareMdButton class="wf-ml-4" button-size="small" label="조회" button-type="liner" />
          </div>
        </CommonTableContentCell>
      </CommonTableRow>
    </CommonTable>
    <div class="wf-mt-20">
      <ExhibitionHallMngtDetailedReservationTable />
    </div>
  </div>
</template>
