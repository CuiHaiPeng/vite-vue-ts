import { createRouter, createWebHistory } from 'vue-router'
import { BaseUrl } from '/@/config/index'
//router自动引入
const modulesFiles = import.meta.globEager('./modules/*.ts')
const routers = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  const value = modulesFiles[modulePath]
  return modules.concat(value.default)
}, [])

//暴露router
const router = createRouter({
  history: createWebHistory(BaseUrl),
  routes: routers,
})
//暴露router
export default router
