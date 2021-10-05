import { buildUrl } from './helpers/url'
import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformConfig(config)
}

function transformConfig(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}
export default axios
