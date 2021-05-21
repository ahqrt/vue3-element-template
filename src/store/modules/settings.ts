import defaultSettings from '@/settings'
import { ActionTree, Module } from 'vuex'
import { RootState } from '..'

const { fixedHeader, sidebarLogo } = defaultSettings

export interface SettingState {
  fixedHeader: boolean
  sidebarLogo: boolean
}

const state: SettingState = {
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
}

const mutations = {
  CHANGE_SETTING: (state: SettingState, { key, value }: { key: keyof SettingState; value: any }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
}

const actions: ActionTree<SettingState, RootState> = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
}

export const settingStore: Module<SettingState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
}
