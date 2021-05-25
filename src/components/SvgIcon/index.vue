<template>
  <svg
    :style="{
      width: iconClass.width,
      height: iconClass.height,
      display: 'inline-block',
      marginRight: '12px',
      marginLeft: '-2px',
    }"
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
      type: Object,
      default: {
        width: '18px',
        height: '18px',
      },
      required: false,
    },
    iconHref: {
      type: String,
      required: true,
    },
  },
})
</script>
