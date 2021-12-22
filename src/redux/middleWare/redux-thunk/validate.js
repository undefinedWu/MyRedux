/**
 * 此文件书写的中间件就是验证我之前写的原版applyMiddleWare实现
 * @param {any} extra 额外的信息参数
 * @returns
 */
function createThunkMiddleware(extra) {
    return store => next => action => {
        if (typeof action === 'function') {
            return action(store.dispatch, store.getState, extra)
        }
        return next(action)
    }
}
const thunk = createThunkMiddleware()
thunk.withExtraArgument = createThunkMiddleware

export default thunk
