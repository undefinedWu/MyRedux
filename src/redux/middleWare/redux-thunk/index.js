function createThunkMiddleware(extra) {
    return function (store) {
        const _dispatch = store.dispatch
        const _getState = store.getState
        return function (next) {
            return function (action) {
                if (typeof action === 'function') {
                    return action(_dispatch, _getState, extra)
                }
                return next(action)
            }
        }
    }
}
const thunk = createThunkMiddleware()
thunk.withExtraArgument = createThunkMiddleware

export default thunk
