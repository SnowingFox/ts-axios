import { Interceptors } from '../core/Axios'

export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'common'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: ICancelToken
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string

  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void

  [propName: string]: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosErrorConfig extends Error {
  message: string
  config: AxiosRequestConfig
  request?: any
  code?: string | null
  response?: AxiosResponse
}

export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors
  cancelToken?: ICancelToken

  request<T = any>(url: string | AxiosRequestConfig, config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  interceptors: Interceptors
}

export interface AxiosStaticInstance extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (val: any) => boolean
}

export interface AxiosInterceptorManager<T = any> {
  use(resolved: ResolvedFn<T>, reject?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T = any> {
  (response: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

export interface ICancelToken {
  promise: Promise<ICancel>
  reason?: ICancel

  throwIfRequested(): void
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: ICancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (exectuor: CancelExecutor): ICancelToken

  source(): CancelTokenSource
}

export interface ICancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): ICancel
}
