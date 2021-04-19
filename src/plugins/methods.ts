import { App } from 'vue'
import Router from '/@/router'
import { RouteLocationRaw } from 'vue-router'
import Config, { ConfigInter } from '/@/config/index'

export default {
  install(app: App): void {
    // 全局挂载方法
    app.config.globalProperties.$to = (config: any, type?: boolean): boolean => {
      if (typeof config === 'string' && /^http.*/i.test(config)) {
        window.open(config, '_blank')
      } else if (type) {
        const newUrl = Router.resolve(config)
        window.open(newUrl.path, '_blank')
      } else if (!type) {
        Router.push(config)
      }
      return false
    }
    app.config.globalProperties.$config = Config
  },
}
// 对vue进行类型补充说明
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    /** 路由跳转方法 */
    $to: (config: RouteLocationRaw, type?: boolean) => void
    //require
    require(img: string): string
    //配置
    $config: ConfigInter
  }
}
