import { compose } from './compose'
/**
 * @param  {...any[]} middlewares 所有的中间件
 * @returns
 */
export function applyMiddlewares(...middlewares) {
    return function (createStore) {
        return function (reducer, initialValue) {
            const store = createStore(reducer, initialValue)
            // 保存初始状态的dispatch
            // window.$dispatch1 = store.dispatch
            // 一开始存储在store中的dispatch函数
            let dispatch = store.dispatch
            // 传递给第一个参数中 此时就是需要保存最新的dispatch函数
            // 关于为什么不能使用第二种方法
            // 此时就是可能出现 执行中间件得到dispatch创建函数 就已经取出 对应的dispatch函数以及getState函数 此时如果在后期修改的时候 实际上是无效的
            const curState = {
                getState: store.getState,
                // 利用闭包访问到当前dispatch
                dispatch: (...arg) => dispatch(...arg),
                // dispatch,
            }

            // 最终存储在store中的dispatch函数
            dispatch = compose(middlewares, curState)(dispatch)
            store.dispatch = dispatch

            // curState.dispatch = dispatch
            return store
        }
    }
}

// 中间件的形式

// const logger = store => next => action => {
//     console.log(action)
// }
