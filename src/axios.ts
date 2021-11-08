import { AxiosRequestConfig, AxiosStaticInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(initConfig: AxiosRequestConfig): AxiosStaticInstance {
  const context = new Axios(initConfig)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStaticInstance
}

const axios = createInstance(defaults)

axios.create = function(config?: AxiosRequestConfig) {
  config = config || {}

  return createInstance(mergeConfig(config, defaults))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
