/**
 *
 * 主要就是让我们在action创建函数中，可以返回一个promise 或者 action对象的payload属性是一个promise
 * 明确基本使用
 *  先判断是不是标准的Flux standard action
 * 1.不是 action创建函数返回的是一个promise
 * 2.是   action对象的payload属性是一个promise
 */

export default function promiseMiddleware(store) {
    const _dispatch = store.dispatch
    return function dispatchCreator(next) {
        return function dispatch(action) {
            if (!isFSA(action)) {
                // 此时就是不是标准的fsa
                return isPromise(action) ? action.then(_dispatch) : next(action)
            }
            return isPromise(action.payload)
                ? action.payload
                      .then(data =>
                          _dispatch({
                              ...action,
                              payload: data,
                          }),
                      )
                      .catch(err => {
                          _dispatch({
                              ...action,
                              error: true,
                              payload: err,
                          })
                          return Promise.reject(err)
                      })
                : next(action)
        }
    }
}

/**
 * 就是判断当前action是否严格遵循 flux standard action
 * @param {*} action
 * @returns boolean
 */
function isFSA(action) {
    // 判断是不是平面对象
    // if (Object.getPrototypeOf(action) !== Object.prototype) {
    //     throw new Error('aciton must be a plain object')
    // }
    // type属性值是一个字符串
    // if (typeof action.type === 'string') {
    //     throw new Error('the value of type must be a string in action')
    // }
    // 对象中的每个属性 是否都是规定字段
    // const standardKey = ['type', 'payload', 'error', 'meta']
    // if (!Object.keys(action).every(it => standardKey.includes(it))) {
    //     throw new Error(`action property must be any of ${standardKey}`)
    // }

    return (
        Object.getPrototypeOf(action) === Object.prototype &&
        typeof action.type === 'string' &&
        Object.keys(action).every(it => ['type', 'payload', 'error', 'meta'].includes(it))
    )
}

function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}
