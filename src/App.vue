<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { useProvider } from './context'

export default {
  name: 'App',
  setup() {
    useProvider()
  },
}
</script>
