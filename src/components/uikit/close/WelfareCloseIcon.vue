<script setup lang="ts">
import { defaultColor } from '@/common/color'
import IconCloseRounded from '@/components/icons/IconCloseRounded.vue'
import { IconPropsType } from '@/models/icons/IconPropsType'
import { ref } from 'vue'

type WelfareCloseIconEmit = (e: 'click', event: MouseEvent) => void

const props = withDefaults(defineProps<IconPropsType>(), {
  width: 20,
  height: 20,
  color: defaultColor._525
})
const colorActive = ref(props.color)

const checkHover = (payload: boolean) => {
  colorActive.value = payload ? defaultColor._333 : defaultColor._525
}

const emits = defineEmits<WelfareCloseIconEmit>()
</script>

<template>
  <button type="button" @click="emits('click', $event)" class="wf_close--btn" @mouseover="checkHover(true)" @mouseout="checkHover(false)">
    <IconCloseRounded :height="props.height" :width="props.width" :color="colorActive"></IconCloseRounded>
  </button>
</template>
