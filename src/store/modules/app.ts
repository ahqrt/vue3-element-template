import Cookies from 'js-cookie'
import { Module, ActionTree } from 'vuex'
import { RootState } from '..'

export interface AppState {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  device: string
}

const state: AppState = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+(Cookies.get('sidebarStatus') as string) : true,
    withoutAnimation: false,
  },
  device: 'desktop',
}

const mutations = {
  TOGGLE_SIDEBAR: (state: AppState) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', '1')
    } else {
      Cookies.set('sidebarStatus', '0')
    }
  },
  CLOSE_SIDEBAR: (state: AppState, withoutAnimation: boolean) => {
    Cookies.set('sidebarStatus', '0')
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state: AppState, device: string) => {
    state.device = device
  },
}

const actions: ActionTree<AppState, RootState> = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }: { withoutAnimation: boolean }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device: string) {
    commit('TOGGLE_DEVICE', device)
  },
}

export const appStore: Module<AppState, RootState> = {
  state,
  mutations,
  actions,
}
