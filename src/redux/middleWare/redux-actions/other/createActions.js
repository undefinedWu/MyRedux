import { createAction } from './createAction'
/**
 *
 * @param {object} params 就是配置对象
 * @returns
 */
export function createActions(params) {
    const ans = {}
    for (const key in params) {
        if (Object.hasOwnProperty.call(params, key)) {
            const element = params[key]
            const newKey = toCamel(key)
            if (Array.isArray(element)) {
                // 说明此时就是向传递metale
                if (Array.length === 2 && Array.every(it => typeof it === 'function')) {
                    ans[newKey] = createAction(key, ...element)
                } else {
                    throw new Error(
                        'Expected function, undefined, null, or array with payload and meta functions for SET_NUM',
                    )
                }
            } else {
                ans[newKey] = createAction(key, element)
            }
        }
    }
    return ans
}

/**
 * 假定都是以下划线进行分割的
 * @param {string} str 元字符串
 * @returns 转换成小驼峰命名的字符串
 */
function toCamel(str) {
    return str
        .split('_')
        .map((it, i) => (i === 0 ? it.toLowerCase() : it[0].toUpperCase() + it.slice(1).toLowerCase()))
        .join('')
}
