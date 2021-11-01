import { buildUrl } from '../helpers/url'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/interface'
import { transformRequest, processResponeseData } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import xhr from './xhr'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformConfig(config)
  config.headers = transformRequestHeaders(config)
  config.data = transformRequestData(config)
}

function transformConfig(config: AxiosRequestConfig): string {
  const { url, data } = config
  return buildUrl(url!, data)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformRequestHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): any {
  res.data = processResponeseData(res.data)
  res.config.data = processResponeseData(res.config.data)
  return res
}
