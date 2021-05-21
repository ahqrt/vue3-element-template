import { AppState, appStore } from './modules/app'
import { createStore } from 'vuex'

export type RootState = {
  appStore: AppState
}

export const store = createStore({
  modules: {
    appStore,
  },
})
