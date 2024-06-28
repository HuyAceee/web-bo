<script setup lang="ts">
import { WelfareSelect } from '@/components'
import { WelfareSelectOptionType } from '@/models'
import { ref } from 'vue'

const options: WelfareSelectOptionType[] = [
  { label: '하위분류 체계 정리 01', value: '1' },
  { label: '하위분류 체계 정리 02', value: '2' },
  { label: '하위분류 체계 정리 03', value: '3' }
]

const defaultSelect = ref()

const defaultSelectFirst = ref()
const defaultSelectSecond = ref()
const defaultSelectThird = ref()
const smallSelectFirst = ref()
const smallSelectSecond = ref()
const smallSelectThird = ref()

const defaultLabelSelectFirst = ref()
const defaultLabelSelectSecond = ref()
const defaultLabelSelectThird = ref()
const smallLabelSelectFirst = ref()
const smallLabelSelectSecond = ref()
const smallLabelSelectThird = ref()
</script>

<template>
  <div class="grid select-container">
    <!-- size 40-->
    <div class="select-box">
      <!-- only drop-down-->
      <div class="wf-mt-16">
        <WelfareSelect v-model="defaultSelectFirst" placeholder="텍스트" optionLabel="label" :options="options" />
      </div>
      <div class="wf-mt-16">
        <WelfareSelect v-model="defaultSelectSecond" placeholder="텍스트" optionLabel="label" :options="options" />
      </div>
      <div class="wf-mt-16">
        <WelfareSelect v-model="defaultSelectThird" placeholder="텍스트" optionLabel="label" :options="options" />
      </div>
      <div class="wf-mt-16">
        <WelfareSelect v-model="defaultSelectFirst" placeholder="텍스트" optionLabel="label" :options="options" disabled />
      </div>

      <!-- size 30-->
      <div class="mt-92">
        <div class="wf-mt-16">
          <WelfareSelect v-model="smallSelectFirst" placeholder="텍스트" optionLabel="label" :options="options" small />
        </div>
        <div class="wf-mt-56">
          <WelfareSelect v-model="smallSelectSecond" placeholder="텍스트" optionLabel="label" :options="options" small />
        </div>
        <div class="wf-mt-57">
          <WelfareSelect v-model="smallSelectThird" placeholder="텍스트" optionLabel="label" :options="options" small />
        </div>
        <div class="wf-mt-56">
          <WelfareSelect v-model="smallSelectFirst" placeholder="텍스트" optionLabel="label" :options="options" disabled small />
        </div>
      </div>
    </div>
    <!-- drop-down with text-->
    <div class="select-box-left">
      <div class="">
        <div class="">
          <WelfareSelect
            v-model="defaultLabelSelectFirst"
            placeholder="텍스트"
            optionLabel="label"
            :options="options"
            labelTop="text"
            labelLeft="text"
          />
        </div>

        <div class="wf-mt-25">
          <WelfareSelect
            v-model="defaultLabelSelectSecond"
            placeholder="텍스트"
            optionLabel="label"
            :options="options"
            labelTop="text"
            labelLeft="text"
          />
        </div>

        <div class="wf-mt-20">
          <WelfareSelect
            v-model="defaultLabelSelectThird"
            placeholder="텍스트"
            optionLabel="label"
            :options="options"
            labelTop="text"
            labelLeft="text"
          />
        </div>

        <div class="wf-mt-18">
          <WelfareSelect
            v-model="defaultLabelSelectThird"
            placeholder="텍스트"
            optionLabel="label"
            :options="options"
            labelTop="text"
            labelLeft="text"
            disabled
          />
        </div>
      </div>
      <!-- Small label-->
      <div class="wf-mt-37">
        <div class="wf-mt-37">
          <WelfareSelect
            v-model="smallLabelSelectFirst"
            placeholder="텍스트"
            optionLabel="label"
            :options="options"
            small
            labelTop="text"
            labelLeft="text"
          />
        </div>
        <div class="wf-mt-37">
          <WelfareSelect
            v-model="smallLabelSelectSecond"
            placeholder="텍스트"
            optionLabel="label"
            :options="options"
            small
            labelTop="text"
            labelLeft="text"
          />
        </div>
        <div class="wf-mt-31">
          <WelfareSelect
            v-model="smallLabelSelectThird"
            placeholder="텍스트"
            optionLabel="label"
            :options="options"
            small
            labelTop="text"
            labelLeft="text"
          />
        </div>
        <!-- disable state-->
        <div class="wf-mt-31">
          <WelfareSelect
            v-model="smallLabelSelectFirst"
            placeholder="텍스트"
            optionLabel="label"
            :options="options"
            small
            disabled
            labelTop="text"
            labelLeft="text"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="wf-ml-20 wf-mt-56 select-box-bottom">
    <p class="wf-mt-16">셀렉트 박스 하위영역</p>
    <div class="wf-mt-16">
      <WelfareSelect v-model="defaultSelect" placeholder="1차 분류" optionLabel="label" :options="options" bigRadius />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/uikit/uikit-select-view.css');
</style>
