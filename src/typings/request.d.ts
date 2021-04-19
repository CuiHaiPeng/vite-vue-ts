import { CancelToken, Method } from 'axios'
type Codes = 200 | 500 | 404 | number
interface AxiosReturnDataInterface<T = unknown> {
  code: Codes
  data?: T
  result?: T
  message?: string
  rows?: T[]
  msg?: string
  total?: number
}

declare global {
  /** axios返回的参数格式  */
  type RequestData<T = unknown> = Promise<AxiosReturnDataInterface<T>>
  type Page<T = unknown> = {
    /** 总数 */
    total: number
    rows: T[]
  }
  interface PageType {
    /** 当前页数 */
    pageNum?: number
    /** 每页显示记录数 */
    pageSize?: number
  }

  namespace RequestConfig {
    export interface Config {
      /** 是否携带id   */
      carryId: boolean
      /** CancelTokenStatic */
      cancelToken?: CancelToken
    }
    /** axios路径 */
    export interface AxiosRequestParam<D> {
      /** 父路径 */
      baseURL?: string
      /** 路径 */
      url: string
      /** 参数 */
      data?: D
      /** 方法 */
      method?: Method
      /** 请求头 */
      headers?: Record<string, string>
      /** 超时时间 */
      timeout?: number
      /** 配置 */
      config?: Config
      /** get参数 */
      params?: D
    }
    /** 状态码 */
    type Code = Codes
    /** axios返回的参数  */
    export type AxiosReturnData<T = unknown> = AxiosReturnDataInterface<T>
    /** 方法返回的数据 */
    export type AxiosMehtodsReturnData<T> = Promise<AxiosReturnData<T>>
  }
}
