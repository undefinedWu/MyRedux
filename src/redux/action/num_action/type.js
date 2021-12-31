import { createAction, createActions, handleAction, handleActions, combineActions } from 'redux-actions'
// import { createAction, createActions } from '../../middleWare/redux-actions'

// 所有的actionType
export const ADD_NUM = 'ADD_NUM'
export const DECREASE_NUM = 'DECREASE_NUM'
export const SET_NUM = 'SET_NUM'
export const ASYNC_INCREASE_NUM = 'ASYNC_INCREASE_NUM'
export const ASYNC_DECREASE_NUM = 'ASYNC_DECREASE_NUM'
export const AUTO_INCREASE_NUM = 'AUTO_INCREASE_NUM'
export const STOP_INCREASE = 'STOP_INCREASE'

// 单个创建
// const addNum = createAction(ADD_NUM)
// const decreaseNum = createAction(DECREASE_NUM)
// // 对于payload就是 传递一个函数过去就可以了 第三个参数返回的数字会作为action的meta字段
// const setNum = createAction(SET_NUM, num => num, () => "设置数字")
// const asyncAddNum = createAction(ASYNC_INCREASE_NUM)
// const asyncDecreaseNum = createAction(ASYNC_DECREASE_NUM)
// console.log(addNum())
// console.log(decreaseNum())
// console.log(setNum(5))
// console.log(asyncAddNum())
// console.log(asyncDecreaseNum())

// 参数对象中的value 就是书写对应的payload函数
// 最终返回一个对象
// 返回对象的key就是参数对象的key变成小驼峰命名
// 返回对象的value就是对应的actionCreator函数 调用actionCreator 返回action的type 就是参数对象中的key
// 注意：actionCreator的toString方法是被重写了的 返回对应的参数对象的key（就是actionType）
export const { addNum, decreaseNum, setNum } = createActions({
    // actionType: payloadFunc
    ADD_NUM: () => 1,
    DECREASE_NUM: () => -1,
    // 此时就是分别对应padloadFunc, metaFunc
    SET_NUM: [num => num, () => 'meta信息'],
})
// console.log(addNum())
// console.log(decreaseNum())
// console.log(setNum())
// { type: ADD_NUM }

// 重写toString方法 此时就是可以得到对应的type属性了
// console.dir(addNum.toString())
// console.log(setNum(5))
// console.log(decreaseNum(5, 8))

// 对于reducer的处理 此时返回的就是一个reducer
// export const reducer = handleAction(ADD_NUM, state => state + 1, 10)

// 上面代码等同如下
// function reducer1(state, action) {
//     switch (action.type) {
//         case ADD_NUM:
//             return state + 1
//         default:
//             return state
//     }
// }

function myHandleAction(type, reducer, defaultState) {
    return function (state = defaultState, action) {
        switch (action.type) {
            case type:
                return reducer(state, action)
            default:
                return defaultState
        }
    }
}
// combineActions(addNum, decreaseNum) 返回一个对象就是将type类型进行连接 教于
export const reducer = handleActions(
    {
        // action的type类型， 最终返回的状态
        // 对应key也可以使用对应的 actionCreator 因为上面存在重载的toString方法
        // [addNum]: state => state + 1,
        // [decreaseNum]: state => state - 1,
        [combineActions(addNum, decreaseNum)]: (state, { payload }) => state + payload,
        [setNum]: (_, action) => action.payload,
    },
    10,
)
// 上述代码的最终返回结果
// function reducer1(state, action) {
//     switch (action.type) {
//         case ADD_NUM:
//             return state + 1
//         case DECREASE_NUM:
//             return state - 1
//         case SET_NUM:
//             return action.payload
//         default:
//             return state
//     }
// }

// 映射成一个map集合 然后has判断有无 没有就直接返回对应的 state 有调用对应的函数进行返回
