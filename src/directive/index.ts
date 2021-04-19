import { App } from 'vue'
import Loading from './modules/loading'
export default {
  install(app: App) {
    app.directive('loading', Loading)
  },
}
