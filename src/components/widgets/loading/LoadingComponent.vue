<script setup lang="ts">
import { ImgLoader } from '@/assets'
type LoadingProps = {
  loading?: boolean
  size?: 'large' | 'small'
}

withDefaults(defineProps<LoadingProps>(), {
  loading: false,
  size: 'large'
})
</script>

<template>
  <div v-show="$props.loading" class="wf_loading-wrapper">
    <img :class="[{'wf_loading-icon':$props.size === 'large'}, {'wf_loading-icon-condition':$props.size === 'small'}]" :src="ImgLoader" alt="spin" />
  </div>
</template>
