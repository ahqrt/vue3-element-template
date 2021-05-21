import { AppState, appStore } from './modules/app'
import { createStore } from 'vuex'
import { SettingState, settingStore } from './modules/settings'
import { UserState, userStore } from './modules/user'

export type RootState = {
  appStore: AppState
  settingStore: SettingState
  userStore: UserState
}

export const store = createStore({
  modules: {
    appStore,
    settingStore,
    userStore,
  },
})
