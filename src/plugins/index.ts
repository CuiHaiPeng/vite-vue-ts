import { App } from 'vue'
import Antd from './antd'
import Methods from './methods'
import Components from './components'
export default {
  install(app: App) {
    //antdUi库
    app.use(Antd)
    //自定义组件
    app.use(Components)
    //方法
    app.use(Methods)
  },
}
