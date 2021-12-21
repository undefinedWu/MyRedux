/**
 * 此函数的作用就是件
 * @param {*} middlewares
 * @param {*} store 就是仓库对象 但是只存在getState函数和dispatch函数
 */
export function compose(middlewares, store) {
    return function (dispatch) {
        let next = dispatch // 表示每次向当前中间件 所传递的中间件
        for (let i = middlewares.length - 1; i >= 0; i--) {
            // 拿到当前中间件所传递的dispatch函数
            next = middlewares[i](store)(next)
        }
        return next
    }
}
