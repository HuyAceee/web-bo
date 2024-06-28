<script setup>
import { icMenuBar, icStarEmpty, icFiles, icSmileCircle } from "@/assets"
import { useWelfareSidebar } from "@/composables"
import { computed } from "vue"

const { handleClick} = useWelfareSidebar()

const listICons = computed(() => {
  return [icMenuBar, icStarEmpty, icFiles, icSmileCircle]
})

</script>

<template>
  <div id="wf-navbar">
    <button v-for="(item, index) in listICons" :key="index" @click="handleClick($event, index)" id="wf-navbar-menu"
      class="wf_navbar-btn" v-bind:class="{ black: index === 0 }">
      <img alt="" :src="item" />
    </button>
  </div>
</template>


