<script setup lang="ts">
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import { useWelfarePagination } from '@/composables/widgets'
import { WelfarePaginationEmits, WelfarePaginationProps } from '@/models'
import { watch } from 'vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import IconArrowLeftDouble from '@/components/icons/IconArrowLeftDouble.vue'
import IconArrowRightDouble from '@/components/icons/IconArrowRightDouble.vue'

const props = defineProps<WelfarePaginationProps>()
const emits = defineEmits<WelfarePaginationEmits>()

const {
  page,
  pageCount,
  first,
  rows,
  pageLinks,
  disabledFirst,
  disabledPrev,
  disabledNext,
  disabledLast,
  handelClickPageButton,
  handelClickFirstButton,
  handelClickLastButton,
  handelClickPrevButton,
  handelClickNextButton
} = useWelfarePagination(props)

watch(first, (newFirst) => {
  emits('update:first', newFirst)
})

watch(rows, (newRows) => {
  emits('update:rows', newRows ?? 0)
})

watch(page, (newPage) => {
  emits('page', {
    first: first.value,
    rows: rows.value ?? 0,
    page: newPage,
    pageCount: pageCount.value
  })
})

const isDisabled = (disable: boolean) => {
  return disable ? ' p-disabled ' : ''
}
</script>

<template>
  <div v-if="props.totalRecords && props.totalRecords > 0" class="p-paginator p-component">
    <button :class="'p-paginator-first p-paginator-element p-link' + isDisabled(disabledFirst)" type="button" @click="handelClickFirstButton">
      <IconArrowLeftDouble />
    </button>
    <button :class="'p-paginator-prev p-paginator-element p-link' + isDisabled(disabledPrev)" @click="handelClickPrevButton">
      <IconArrowLeft />
    </button>

    <span class="p-paginator-pages" data-pc-section="pages">
      <button
        v-for="pageLink in pageLinks"
        v-bind:key="pageLink"
        :class="'p-paginator-page p-paginator-element p-link' + (pageLink - 1 == page ? ' p-highlight ' : '')"
        type="button"
        @click="() => handelClickPageButton(pageLink - 1)"
      >
        {{ pageLink }}
      </button>
    </span>

    <button :class="'p-paginator-next p-paginator-element p-link' + isDisabled(disabledNext)" @click="handelClickNextButton">
      <IconArrowRight />
    </button>
    <button :class="'p-paginator-last p-paginator-element p-link' + isDisabled(disabledLast)" @click="handelClickLastButton">
      <IconArrowRightDouble />
    </button>
  </div>
</template>
