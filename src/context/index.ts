import { useAppInject, useAppProvider } from './appContext'
export { useAppInject }

export const useProvider = () => {
  useAppProvider()
}
