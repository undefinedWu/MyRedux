import { isFunction } from '../utils/isFunction'
import { isPlainObject } from '../utils/isPlainObject'
import { hasProperty } from '../utils/hasProperty'
import { testing } from '../utils/testing'

export function createStore(reducer, initialValue, applyMiddleWare) {
    // 保存初始值
    let state = initialValue
    // 保存所使用的reducer
    let _reducer = reducer
    // 订阅函数所在的队列
    let SubscribeQueue = []

    // 此时就是第二个参数或者第三个参数表示一个中间件
    if (typeof initialValue === 'function') {
        return initialValue(createStore)(reducer, applyMiddleWare)
    } else if (typeof applyMiddleWare === 'function') {
        return applyMiddleWare(createStore)(reducer, initialValue)
    }
    /**
     * 分发一个状态
     * @param {object} action action对象
     */
    function dispatch(action) {
        isPlainObject(action)

        hasProperty(action, 'type')

        // 调用reducer 获取得到新的状态
        state = _reducer(state, action)

        // 调用订阅函数
        SubscribeQueue.forEach(it => it())
    }

    /**
     * 订阅在状态发生变化的是否所触发的函数
     * 返回一个取消订阅的函数
     *
     * @param {function} listener 订阅函数
     */
    function subscribe(listener) {
        isFunction(listener)

        SubscribeQueue.push(listener)

        return () => {
            SubscribeQueue = SubscribeQueue.filter(it => it !== listener)
        }
    }

    /**
     * 获取存储在仓库里面的数据
     * @returns
     */
    function getState() {
        return state
    }

    dispatch(testing.INIT)

    return {
        dispatch,
        getState,
        subscribe,
    }
}
