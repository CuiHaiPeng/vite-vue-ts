import { createStore, useStore as baseUserStore } from 'vuex'
import getters from './getter'

const modulesFiles = import.meta.globEager('./modules/*.ts')
const modules = Object.keys(modulesFiles).reduce<any>((modules, modulePath) => {
  const value = modulesFiles[modulePath]
  const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  modules[moduleName] = value.default
  return modules
}, {})

//暴露store
export default createStore<StoreConfig.store>({
  modules,
  getters,
})

//key
export const key: StoreConfig.key = Symbol('vue-store')

//useStore
export const useStore = (): StoreConfig.useStore => baseUserStore(key)
