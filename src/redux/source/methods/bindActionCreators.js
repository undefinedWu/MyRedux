/**
 * 产生自动分发的函数
 * @param {Function | object} actionCollection
 * @param {Function} dispatch
 * @returns
 */
export function bindActionCreators(actionCollection, dispatch) {
    if (typeof actionCollection === 'function') {
        return _bindActionCreator(actionCollection, dispatch)
    } else if (
        // 可能是直接使用模块导出的值
        Object.prototype.toString.call(actionCollection) === '[object Module]' ||
        // 可能就是一个对象
        Object.prototype.toString.call(actionCollection) === '[object Object]'
    ) {
        const result = {}
        for (const prop in actionCollection) {
            result[prop] = _bindActionCreator(actionCollection[prop], dispatch)
        }
        return result
    } else {
        throw new Error('Expected actionCreator must be a function or Object')
    }
}

function _bindActionCreator(actionCreator, dispatch) {
    if (typeof dispatch !== 'function') {
        throw new Error('the second parameter must be a function')
    }
    if (typeof actionCreator !== 'function') {
        throw new Error('Expected actionCreator must be a function')
    }
    return () => {
        const action = actionCreator()
        dispatch(action)
    }
}
