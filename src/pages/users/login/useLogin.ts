import { validUsername } from '@/utils/validate'
import { ref, watch } from 'vue'
import type { LocationQueryValue } from 'vue-router'
import type { ElFormItemContext } from 'element-plus/lib/el-form/src/token'
import { route, router, store } from '@/utils/useComm'

export const useLogin = () => {
  const validateUsername = (rules: object, value: any, callback: Function) => {
    if (!validUsername(value)) {
      callback(new Error('Please enter the corrent user name'))
    } else {
      callback()
    }
  }
  const validatePassword = (rules: object, value: any, callback: Function) => {
    if (value.length < 6) {
      callback(new Error('The password can not be less than 6 digits'))
    } else {
      callback()
    }
  }

  const loginForm = ref({
    username: 'admin',
    password: '111111',
  })

  const loginRules = {
    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
    password: [{ required: true, trigger: 'blur', validator: validatePassword }],
  }

  const loading = ref(false)

  const redirect = ref<LocationQueryValue | LocationQueryValue[] | undefined>(undefined)
  watch(route.query, () => (redirect.value = route.query && route.query.redirect))

  const passwordType = ref('password')
  const showPwd = () => {
    if (passwordType.value === 'password') {
      passwordType.value = ''
    } else {
      passwordType.value = 'password'
    }
  }

  const loginFormRef = ref<ElFormItemContext | null>(null)

  const handleLogin = () => {
    if (loginFormRef.value) {
      loginFormRef.value.validate((valid) => {
        if (valid) {
          loading.value = true
          store
            .dispatch('userStore/login', loginForm.value)
            .then(() => {
              router.push({ path: (redirect.value as string) || '/' })
              loading.value = false
            })
            .catch(() => (loading.value = false))
        } else {
          console.log('err submit!')
          return false
        }
      })
    }
  }
  return {
    loginForm,
    loginRules,
    passwordType,
    handleLogin,
    showPwd,
    loading,
  }
}
