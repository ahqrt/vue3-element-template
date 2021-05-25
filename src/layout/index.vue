<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>
<script lang="ts">
import useResize from './hooks/useResize'
import { Navbar, Sidebar, AppMain } from './components'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { RootState } from '@/store'
export default defineComponent({
  components: { Navbar, Sidebar, AppMain },
  setup() {
    useResize()
    const store = useStore<RootState>()
    const sidebar = computed(() => store.state.appStore.sidebar)
    const device = computed(() => store.state.appStore.device)
    const fixedHeader = computed(() => store.state.settingStore.fixedHeader)
    const classObj = computed(() => {
      return {
        hideSidebar: !store.state.appStore.sidebar.opened,
        openSidebar: store.state.appStore.sidebar.opened,
        withoutAnimation: store.state.appStore.sidebar.withoutAnimation,
        mobile: store.state.appStore.device === 'mobile',
      }
    })
    const handleClickOutside = () => {
      store.dispatch('appStore/closeSideBar', { withoutAnimation: false })
    }
    return {
      sidebar,
      device,
      fixedHeader,
      classObj,
      handleClickOutside,
    }
  },
})
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
