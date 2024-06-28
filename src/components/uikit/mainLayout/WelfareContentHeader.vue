<script setup lang="ts">
import { defaultColor } from '@/common/color'
import { WelfareHeaderContentProps } from '@/models'
import { ref } from 'vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconInfo from '@/components/icons/IconInfo.vue'
defineProps<WelfareHeaderContentProps>()
const isHovered = ref(false)
const toggleHover = () => {
  isHovered.value = !isHovered.value
}
</script>

<template>
  <div class="wf_bg-primary-0 wf-w-full wf_flex-1" :class="isBigHeader ? 'wf-py-20 wf-px-50' : 'wf-py-18 wf-px-30 wf_h-56'">
    <div class="wf_flex wf_justify-between">
      <h3 v-if="isBigHeader" class="wf_text-white wf_flex wf_items-center wf-space-x-8">
        <span>{{ title }}</span>
        <span v-if="hasTips" id="wf-form-tips" class="wf-flex-row wf-text--center wf_h-24">
          <button id="">
            <IconInfo
              :width="22"
              :height="22"
              :color="isHovered ? defaultColor._d95729 : defaultColor._fff"
              @mouseover="toggleHover"
              @mouseout="toggleHover"
            />
            <div id="wf-form-tips--popup" class="wf-space-y-6">
              <slot name="tips-content">
                <p class="wf-body_04-reg wf_text-n-33">
                  -&nbsp;&nbsp;&nbsp;별표<span class="wf_text-sub-01">(*)</span>&nbsp;항목은 필수 입력 항목입니다.
                </p>
                <p class="wf-body_04-reg wf_text-n-33">-&nbsp;&nbsp;&nbsp;필수 입력 정보를 모두 저장한 후 승인 요청하실 수 있습니다.</p>
              </slot>
            </div>
            <span class="wf-text-warning wf-ml-9">배송 상품 대량 등록시 유의사항</span>
          </button>
        </span>
      </h3>
      <h6 v-else class="wf_text-white wf_flex wf_items-center wf-space-x-8">
        <span>{{ title }}</span>
        <span v-if="hasTips" id="wf-form-tips" class="wf-flex-row wf-text--center wf_h-24">
          <button id="">
            <IconInfo
              :width="22"
              :height="22"
              :color="isHovered ? defaultColor._d95729 : defaultColor._fff"
              @mouseover="toggleHover"
              @mouseout="toggleHover"
            />
            <div id="wf-form-tips--popup" class="wf-space-y-6">
              <slot name="tips-content">
                <div v-if="tooltipElement" v-html="tooltipElement"></div>
                <template v-else>
                  <p class="wf-body_04-reg wf_text-n-33">
                    -&nbsp;&nbsp;&nbsp;별표<span class="wf_text-sub-01">(*)</span>&nbsp;항목은 필수 입력 항목입니다.
                  </p>
                  <p class="wf-body_04-reg wf_text-n-33">-&nbsp;&nbsp;&nbsp;필수 입력 정보를 모두 저장한 후 승인 요청하실 수 있습니다.</p>
                </template>
              </slot>
            </div>
            <span class="wf-text-warning wf-ml-9">배송 상품 대량 등록시 유의사항</span>
          </button>
        </span>
      </h6>
      <div class="wf_flex wf_header-link-content wf_items-center wf-space-x-6">
        <div v-for="(path, idx) in paths" :key="idx" class="wf-space-x-6 wf_items-center wf_flex">
          <router-link :to="path.path === '' ? '/' : path.path ?? ''" class="wf_text-nf-ncc wf-body_04-mid wf_text-none">{{ path.name }}</router-link>
          <IconArrowRight v-if="idx !== paths.length - 1" :width="12" :height="12" :color="defaultColor._e5e" />
        </div>
        <slot name="wf-header-ic" class="wf-py-10 wf-ml-17"></slot>
      </div>
    </div>
  </div>
</template>
