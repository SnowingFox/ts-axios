import { Canceler, CancelExecutor, CancelTokenSource, ICancel, ICancelToken } from '../types/index'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: string | PromiseLike<string>): void
}

export default class CancelToken implements ICancelToken {
  promise: Promise<ICancel>
  reason?: ICancel

  constructor(exectuor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    this.promise = new Promise<ICancel>((resolve: any) => {
      resolvePromise = resolve
    })

    exectuor(message => {
      if (this.reason) {
        return
      }

      this.reason = new Cancel(message)
      resolvePromise(message)
    })
  }

  throwIfRequested() {
    //Check whether this token has been used
    if (this.reason) {
      //If so, it will be thrown a error
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler

    const token = new CancelToken(c => {
      cancel = c
    })

    return {
      cancel,
      token
    }
  }
}
