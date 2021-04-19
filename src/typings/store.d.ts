import { Store, Module as StoreMoudle, GetterTree } from 'vuex'
import { InjectionKey } from 'vue'
declare global {
  namespace StoreConfig {
    //全局模块
    export type app = {
      appData: string
    }
    //测试模块
    export type user = {
      token: string
    }
    //默认的store
    export type store = {
      app: app
      user: user
    }
    //storeKey
    export type key = InjectionKey<Store<store>>
    //useStore
    export type useStore = Store<store>

    //module
    export type module<D> = StoreMoudle<D, store>

    //getter
    export type getters = GetterTree<store, store>
  }
}
