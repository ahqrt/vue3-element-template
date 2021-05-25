import { RootState } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
const route = useRoute()
const router = useRouter()
const store = useStore<RootState>()
export { route, router, store }
