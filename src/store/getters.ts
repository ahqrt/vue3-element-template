import { GetterTree } from 'vuex'
import { RootState } from '.'

const getters: GetterTree<RootState, RootState> = {
  sidebar: (state) => state.appStore.sidebar,
  device: (state) => state.appStore.device,
  token: (state) => state.userStore.token,
  avatar: (state) => state.userStore.avatar,
  name: (state) => state.userStore.name,
}
export default getters
