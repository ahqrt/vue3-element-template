<template>
  <svg
    :style="{
      display: 'inline-block',
      width: '1em',
      height: '1em',
    }"
    :class="iconClass"
    aria-hidden="true"
  >
    <use :xlink:href="'#' + iconHref" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    iconClass: {
      type: String,
      required: false,
    },
    iconHref: {
      type: String,
      required: true,
    },
  },
})
</script>
