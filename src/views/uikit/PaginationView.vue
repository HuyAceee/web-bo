<script setup lang="ts">
import { WelfarePagination } from '@/components'
import { PageState } from 'primevue/paginator'

/* Return the first row when page change */
const eventFirst = (value: number) => {
  value
  // console.log('eventFirst', value)
}

/* Return the number of row when page change */
const eventRows = (value: number) => {
  value
  // console.log('eventRows', value)
}

/* Return page number when page change */
const eventPage = (event: PageState) => {
  event?.first
  // console.log('eventPage', event)
}
</script>

<template>
  <div class="wf-container--pagination">
    <WelfarePagination
      :rows="10"
      :pageLinkSize="10"
      :totalRecords="1000"
      @update:first="eventFirst"
      @update:rows="eventRows"
      @page="eventPage"
    ></WelfarePagination>
  </div>
</template>
