<script setup lang="ts">
interface ProductTitleProps {
  title: string
}

const props = defineProps<ProductTitleProps>()
</script>

<template>
  <div class="wf-exhibition-title">
    <span class="wf-ml--2">|</span>
    <span class="wf-ml--3">
      {{ props.title }}
    </span>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/exhibition/common/exhibition-title.css');
</style>