import {
  Axios as AxiosInterface,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  ResolvedFn,
  RejectedFn,
  ICancelToken
} from '../types'
import InterceptorManager, { Interceptor } from './InterceptorManager'
import dispatchRequest from './dispatchRequest'
import mergeConfig from './mergeConfig'
import { processTransformResponse, processTransformRequest } from '../helpers/data'
import CancelToken from '../cancel/CancelToken'

export interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain {
  resolved: ResolvedFn | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios implements AxiosInterface {
  defaults: AxiosRequestConfig
  interceptors: Interceptors

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: string | AxiosRequestConfig, config?: AxiosRequestConfig): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = config || {}
        config.url = url
        config.headers = {}
      } else {
        config.headers = config.headers || {}
        config.url = url
      }
    } else {
      config = url
    }

    if (config.transformRequest) {
      this.defaults.transformRequest = processTransformRequest(config.transformRequest)
    }
    if (config.transformResponse) {
      this.defaults.transformResponse = processTransformResponse(config.transformResponse)
    }

    config = mergeConfig(this.defaults, config)
    const chain: PromiseChain[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    let promise = Promise.resolve(config)
    let requestInterceptor: Interceptor<any>[] = []

    this.interceptors.request.forEach(interceptor => {
      requestInterceptor.unshift(interceptor)
    })

    requestInterceptor.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!

      promise = promise.then(resolved, rejected)
    }

    return promise as AxiosPromise
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWidthoutData('get', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWidthoutData('head', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWidthoutData('delete', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWidthoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWidthData('post', data, url, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWidthData('put', data, url, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.requestWidthData('patch', data, url, config)
  }

  requestWidthoutData(method: Method, url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  requestWidthData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
