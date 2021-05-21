import { store } from '@/store'
import { onBeforeMount, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const { body } = document

const WIDTH = 992

const useResize = () => {
  const route = useRoute()

  const $_isMobile = () => {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  const $_resizeHandler = () => {
    if (!document.hidden) {
      const isMobile = $_isMobile()
      store.dispatch('appStore/toggleDevice', isMobile ? 'mobile' : 'desktop')

      if (isMobile) {
        store.dispatch('appStore/closeSideBar', { withoutAnimation: true })
      }
    }
  }

  watch(
    () => route.path,
    () => {
      if (store.state.appStore.device === 'mobile' && store.state.appStore.sidebar.opened) {
        store.dispatch('appStore/closeSideBar', { withoutAnimation: false })
      }
    }
  )

  onBeforeMount(() => {
    window.addEventListener('resize', $_resizeHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', $_resizeHandler)
  })

  onMounted(() => {
    const isMobile = $_isMobile()
    if (isMobile) {
      store.dispatch('appStore/toggleDevice', 'mobile')
      store.dispatch('appStore/closeSideBar', { withoutAnimation: true })
    }
  })
}

export default useResize
