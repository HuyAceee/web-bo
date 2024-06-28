<script setup lang="ts">
import { DEFAULT_DATE_FORMAT } from '@/common'
import { WelfareDateTimePicker, WelfareInputMask, WelfareInputText, WelfareMdButton } from '@/components'
import { ref } from 'vue'
export interface MemberListToggleTextInputProps {
  value: string | undefined
  type?: 'mask' | 'text' | 'date'
}
interface MemberListToggleTextInputEmits {
  (e: 'update:value', value: string): void
}
defineEmits<MemberListToggleTextInputEmits>()
const isInput = ref(false)

withDefaults(defineProps<MemberListToggleTextInputProps>(), {
  type: 'text'
})

defineExpose({
  clearInput: () => {
    isInput.value = false
  }
})
</script>

<template>
  <div class="wf_flex wf_justify-between wf_items-center wf_width-full">
    <span v-if="!isInput" class="wf-body_03-reg">{{ value }}</span>
    <div v-else>
      <WelfareInputMask
        v-if="type === 'mask'"
        class="wf_w-200"
        :modelValue="value"
        @update:modelValue="(value) => $emit('update:value', value)"
        mask="999-9999-9999"
        placeholder="999-9999-9999"
        size="small"
      />
      <WelfareInputText
        v-else-if="type === 'text'"
        class="wf_w-200"
        :modelValue="value"
        @update:modelValue="(value) => $emit('update:value', value)"
        size="small"
      />
      <WelfareDateTimePicker
        :modelValue="value"
        class="wf_w-200"
        v-else-if="type === 'date'"
        @update:modelValue="(value) => $emit('update:value', value)"
        :format="DEFAULT_DATE_FORMAT"
        :type="'date'"
        size="small"
      />
    </div>
    <WelfareMdButton label="수정" @click="isInput = !isInput" class="wf_w-44" buttonSize="small" buttonType="liner" />
  </div>
</template>
