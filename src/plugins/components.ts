import Img from '/@/components/app/Img.vue'
import { App } from 'vue'
export default {
  install(app: App) {
    app.component(Img.name, Img)
  },
}
