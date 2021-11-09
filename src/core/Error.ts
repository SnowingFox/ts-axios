import { AxiosResponse, AxiosRequestConfig, AxiosErrorConfig } from '../types'

class AxiosError extends Error implements AxiosErrorConfig {
  config: AxiosRequestConfig
  request?: any
  code?: string | null | undefined
  responese?: AxiosResponse | undefined

  constructor(errorConfig: AxiosErrorConfig) {
    let { message, config, code, request, response } = errorConfig

    super(message)

    this.config = config
    this.request = request
    this.code = code
    this.responese = response
  }
}

export default function createError(config: AxiosErrorConfig): AxiosError {
  const error = new AxiosError(config)

  return error
}
