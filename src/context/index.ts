import { App } from 'vue'
import { useAppInject, useAppProvider } from './appContext'
export { useAppInject }

export const useProvider = () => {
  const rootKey = Symbol()
  return {
    install(app: App) {
      app.provide(rootKey, useAppProvider())
    },
  }
}
