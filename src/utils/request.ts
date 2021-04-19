import { AxiosRequestConfig, AxiosResponse } from 'axios'
import Axios from 'axios'
import qs from 'qs'
import { BaseUrl } from '/@/config/index'
import Store from '/@/store'
import router from '/@/router'
import { message } from 'ant-design-vue'
// axios 实例
const instance = Axios.create({
  timeout: 30 * 60 * 1000,
})
// 添加请求拦截器
instance.interceptors.request.use(request => {
  const { data, url, method } = request,
    { token } = Store.state.user || {}

  //携带token
  if (token && url && url.indexOf('noAuth') === -1) {
    request.headers['AuthorizationApi'] = token
  }
  //如果是特殊的post
  if (method === 'put') {
    request.method = 'post'
  } else if (data) {
    request.data = qs.stringify(data)
  }
  return request
})

// 添加响应拦截器
instance.interceptors.response.use((response): AxiosResponse<number> => response)

export const Request = instance

class Abstract {
  // 自定义header头
  protected headers: Record<string, unknown> = {}
  //自定义baseUrl
  static baseUrl = BaseUrl

  //发送消息
  static sendMessage(tips = '提示语句'): void {
    //发送消息
    message.info({
      content: tips,
      key: 'axiosTips',
    })
  }

  //request请求
  static request<T, D = Record<string, unknown>>({
    method = 'GET',
    url = '',
    data,
    headers = {},
    config = {
      carryId: true,
    },
    params,
  }: RequestConfig.AxiosRequestParam<D>): Promise<RequestConfig.AxiosReturnData<T>> {
    const { sendMessage } = Abstract
    return new Promise((resolve, reject) => {
      // request 携带的请求
      const requestData: AxiosRequestConfig = {
        headers,
        method,
        url: `${this.baseUrl}${url}`,
        data,
        params,
      }
      // 配置
      const { carryId, cancelToken } = config
      if (!carryId) {
        // 不携带Id
      }
      // 如果有cancelToken
      if (cancelToken) {
        requestData.cancelToken = cancelToken
      }
      // request 请求
      instance(requestData)
        .then((res: AxiosResponse<RequestConfig.AxiosReturnData<T>>) => {
          const { data } = res
          // 1008token过期  1009登陆失效  1010未带token
          switch (data.code) {
            case 1008:
              // Store.commit("clearUser");
              router.push('/user/login')
              sendMessage('登陆失败，请重新登陆')
              reject(null)
              break
            case 1010:
              sendMessage('请先登录！')
              // router.push("/user/login");
              break
            case 1009:
              // Store.commit("clearUser");
              // router.push("/user/login");
              sendMessage('已被其他设备登陆，请重新登陆！')
              reject(null)
              break
            default:
              resolve(res.data)
              break
          }
        })
        .catch(err => {
          console.log(err)
          reject({
            code: 500,
          })
        })
    })
  }
}
/**
 * $Post请求
 * @param url 路径
 * @param data 参数
 * @param config 配置
 */
export const $post = <T, D>(
  url: string,
  data?: D,
  config?: RequestConfig.Config,
): RequestConfig.AxiosMehtodsReturnData<T> => {
  return Abstract.request<T, D>({
    url: url,
    data: data,
    method: 'PUT',
    config,
  })
}
/**
 * Post请求
 * @param url 路径
 * @param data 参数
 * @param config 配置
 */
export const post = <T, D>(
  url: string,
  data?: D,
  config?: RequestConfig.Config,
): RequestConfig.AxiosMehtodsReturnData<T> => {
  return Abstract.request<T, D>({
    url: url,
    data: data,
    method: 'POST',
    config,
  })
}
/**
 * get请求
 * @param url 路径
 * @param data 参数
 * @param config 配置
 */
export const get = <T, D>(
  url: string,
  data?: D,
  config?: RequestConfig.Config,
): RequestConfig.AxiosMehtodsReturnData<T> => {
  return Abstract.request<T, D>({
    url: url,
    params: data,
    method: 'GET',
    config,
  })
}
export default Abstract
