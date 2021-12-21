import { compose } from './compose'

/**
 *
 * @param  {...any} middlewares 所有的中间件
 * @returns
 */
export function applyMiddlewares(...middlewares) {
    return function (createStore) {
        return function (reducer, initialValue) {
            const store = createStore(reducer, initialValue)
            const curState = {
                getState: store.getState,
                dispatch: store.dispatch,
            }
            // 最终存储在store中的dispatch函数
            const dispatch = compose(middlewares, curState)(store.dispatch)
            store.dispatch = dispatch
            // 替换传递给中间件中的dispatcc函数
            curState.dispatch = dispatch

            return store
        }
    }
}
