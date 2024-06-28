<script setup lang="ts">
import { defaultColor } from '@/common/color'
import { WelfareCloseIcon } from '@/components'
</script>

<template>
  <div class="wf_close--group">
    <WelfareCloseIcon></WelfareCloseIcon>
    <WelfareCloseIcon :color="defaultColor._333"></WelfareCloseIcon>
  </div>
</template>
