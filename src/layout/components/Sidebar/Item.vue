<template>
  <i :class="[icon, 'sub-el-icon']" v-if="icon.includes('el-icon')" />
  <svg-icon :iconHref="icon" v-else />
  <span v-if="title">{{ title }}</span>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
})
</script>
<style lang="scss" scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
