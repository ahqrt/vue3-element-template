<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb" mode="out-in">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{
          item.meta.title
        }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core'
import { compile } from 'path-to-regexp'
import { watch } from 'vue'
import { RouteLocationMatched, RouteLocationRaw, RouteRecordRaw, useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const levelList = ref<any>(null)
    const getBreadcrumb = () => {
      // only show routes with meta.title
      let matched = route.matched.filter((item) => item.meta && item.meta.title)
      console.log(matched)
      const first = matched[0]

      if (isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } } as unknown as RouteLocationMatched].concat(
          matched
        )
      }

      levelList.value = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }
    const isDashboard = (route: RouteLocationMatched) => {
      const name = route && route.name
      if (!name) {
        return false
      }
      return (name as string).trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    }
    const pathCompile = (path: string) => {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = route
      var toPath = compile(path)
      return toPath(params)
    }
    const handleLink = (item: RouteRecordRaw) => {
      const { redirect, path } = item
      if (redirect) {
        router.push(redirect as RouteLocationRaw)
        return
      }
      router.push(pathCompile(path))
    }

    watch(
      () => route.path,
      () => {
        getBreadcrumb()
      }
    )

    getBreadcrumb()

    return {
      handleLink,
      levelList,
    }
  },
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
