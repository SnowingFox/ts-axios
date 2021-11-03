import { AxiosInterceptorManager, RejectFn, ResolvedFn } from '../types'

export interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectFn<T>
}

export default class InterceptorManager<T> implements AxiosInterceptorManager {
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }
  /**
   * Add interceptor
   * @param resolved resolved function
   * @param rejected rejected function
   * @returns interceptor's id of current push
   */
  use(resolved: ResolvedFn<T>, rejected: RejectFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })

    return this.interceptors.length - 1
  }
  /**
   * Delete interceptor
   * @param id A symbol of interceptor which you want to delete
   */
  eject(id: number): void {
    /**
     * Why not use Array.prototype.slice()?
     * Because if you use slice(), All interceptors' id will be confused
     */
    this.interceptors[id] = null
  }
  /**
   * Foreach all interceptors and provide each interceptor as fn's param
   * @param fn hooks
   */
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
}
