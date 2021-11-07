import { buildUrl } from '../helpers/url'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { flattenHeaders } from '../helpers/headers'
import xhr from './xhr'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformConfig(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformConfig(config: AxiosRequestConfig): string {
  const { url, data } = config
  return buildUrl(url!, data)
}

function transformResponseData(res: AxiosResponse): any {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
