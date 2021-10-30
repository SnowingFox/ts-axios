import { AxiosResponse, AxiosRequestConfig, AxiosErrorConfig } from '../types/index'

class AxiosError extends Error implements AxiosErrorConfig {
  public config: AxiosRequestConfig
  public request?: any
  public code?: string | null | undefined
  public responese?: AxiosResponse | undefined

  constructor(errorConfig: AxiosErrorConfig) {
    let { message, config, code, request, response } = errorConfig

    super(message)

    this.config = config
    this.request = request
    this.code = code
    this.responese = response
    //Fix a typescript bug
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export default function createError(config: AxiosErrorConfig): AxiosError {
  const error = new AxiosError(config)

  return error
}
