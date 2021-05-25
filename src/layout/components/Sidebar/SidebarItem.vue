<template>
  <template v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
        <i
          v-if="(onlyOneChild.meta.icon || (item.meta && item.meta.icon)).includes('el-icon')"
          :class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
        ></i>
        <svg-icon :iconHref="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" class="sub-el-icon" v-else />
        <template #title>{{ onlyOneChild.meta.title }} </template>
      </el-menu-item>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </template>
</template>

<script lang="ts">
import { isExternal } from '@/utils/validate'
import Item from './Item.vue'
import AppLink from './Link.vue'
// import FixiOSBug from './FixiOSBug'
import { defineComponent, ref } from 'vue'
import path from 'path-browserify'

export default defineComponent({
  name: 'SidebarItem',
  components: { Item, AppLink },
  // mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    let onlyOneChild = ref<any>()
    const hasOneShowingChild = (children: any[] = [], parent: any) => {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          onlyOneChild.value = item
          return true
        }
      })

      if (showingChildren.length === 1) {
        return true
      }

      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    }
    const resolvePath = (routePath: string) => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }
      return path.resolve(props.basePath, routePath)
    }
    return {
      onlyOneChild,
      hasOneShowingChild,
      resolvePath,
    }
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
