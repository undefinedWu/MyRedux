import { testing } from '../utils/testing'
/**
 * 就是返回一个函数 作为总的reducer
 * @param {object} reducerCollection
 * @returns
 */
export function combineReducers(reducerCollection) {
    if (typeof reducerCollection === 'object' && reducerCollection !== null) {
        // 此时就是先进行验证每一个属性 并进行检测 是不是函数 以及在默认的状态下时候是是返回默认值
        Object.keys(reducerCollection).forEach(it => {
            const reducer = reducerCollection[it]
            if (typeof reducer !== 'function') {
                throw new Error(
                    'Make sure the argument passed to combineReducers is an object whose values are reducers and its value as function',
                )
            }

            // 此时就是利用它获取到初始值
            const initialState = reducer(undefined, testing.INIT)
            if (initialState === undefined) {
                throw new Error('初始状态下不能返回undefined')
            }
            const state = reducer(undefined, testing.PROBE_UNKNOWN_ACTION)
            // 利用当前方式进行探测
            if (state === undefined) {
                throw new Error('初始状态下不能返回undefined')
            }
        })
        return function (state, action) {
            const newState = {}
            for (const prop in reducerCollection) {
                if (typeof reducerCollection[prop] !== 'function') {
                    throw new Error(
                        'Make sure the argument passed to combineReducers is an object whose values are reducers',
                    )
                }
                newState[prop] = reducerCollection[prop](state[prop], action)
            }
            return newState
        }
    } else {
        throw new Error('Make sure the argument passed to combineReducers is an object whose values are reducers')
    }
}
