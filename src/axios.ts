import { AxiosInstance } from './types/interface'
import Axios from './core/Axios'
import { extend } from './helpers/utils'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}
/**
 * 留个疑问，这两种方法是有什么利弊吗？
 * Leave a question, what are the advantages and disadvantages of these two methods?
function createInstance(): AxiosInstance {
  const context = new Axios()

  return context
}
 */
const axios = createInstance()

export default axios
