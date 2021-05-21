import Cookies from 'js-cookie'
import { provide, inject, reactive } from 'vue'

export interface AppState {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  device: string
}

type AppContext = {
  appState: AppState
}

const appSymbol = Symbol()

export const useAppProvider = () => {
  const appState: AppState = reactive({
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+(Cookies.get('sidebarStatus') as string) : true,
      withoutAnimation: false,
    },
    device: 'desktop',
  })
  provide(appSymbol, {
    appState,
  })
}

export const useAppInject = () => {
  const appContext = inject<AppContext>(appSymbol)
  if (!appContext) {
    throw new Error('useAppInject must be used after useAppProvider')
  }
  return appContext
}
