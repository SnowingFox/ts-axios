import { buildUrl, combineURL, isAbsoluteURL } from '../helpers/url'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { flattenHeaders } from '../helpers/headers'
import xhr from './xhr'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformConfig(config)
  config.data = transform(config.data || config.params, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

export function transformConfig(config: AxiosRequestConfig): string {
  let { url, data, paramsSerializer, baseURL } = config
  console.log(baseURL)
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url!)
  }
  return buildUrl(url!, data, paramsSerializer)
}

function transformResponseData(res: AxiosResponse): any {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken?.reason !== undefined) {
    config.cancelToken.throwIfRequested()
  }
}
