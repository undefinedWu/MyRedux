/**
 * 辅助创建 action创建函数
 * @param {any} actionType 就是分发的类型
 * @param {function} payloadFunc 传递payload的时候需要进行使用
 * @param {function} metaCreator 无参函数 函数调用的结果会加入到action的meta字段上
 * @returns {object}
 */
export function createAction(actionType, payloadFunc, metaCreator) {
    function actionCreator(...params) {
        const action = {
            type: actionType,
        }
        if (typeof payloadFunc === 'function') {
            action.payload = payloadFunc(...params)
        } else if (params.length !== 0) {
            action.payload = params[0]
        }
        if (action.payload instanceof Error) {
            action.error = true
        }
        if (typeof metaCreator === 'function') {
            action.meta = metaCreator()
        }
        return action
    }
    actionCreator.toString = function () {
        return actionType
    }
    return actionCreator
}
