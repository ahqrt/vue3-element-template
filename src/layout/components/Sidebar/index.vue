<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variablesS.menuBg"
        :text-color="variablesS.menuText"
        :unique-opened="false"
        :active-text-color="variablesS.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.module.scss'
import { computed, defineComponent, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RootState } from '@/store'

export default defineComponent({
  components: { SidebarItem, Logo },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore<RootState>()
    const routes = computed(() => router.options.routes)
    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    const showLogo = computed(() => store.state.settingStore.sidebarLogo)
    const variablesS = computed(() => variables)
    const isCollapse = computed(() => !store.state.appStore.sidebar.opened)
    watchEffect(() => console.log('isCollapse', isCollapse.value))
    return {
      routes,
      activeMenu,
      showLogo,
      variablesS,
      isCollapse,
    }
  },
})
</script>
