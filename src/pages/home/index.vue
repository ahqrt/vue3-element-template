<template>
  <div>Home</div>
</template>
<script lang="ts" setup>
import { useAppInject } from '@/context/appContext'
const app = useAppInject()
console.log(app)
</script>
<style lang="scss" scoped></style>
