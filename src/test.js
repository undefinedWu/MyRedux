import { createStore, bindActionCreators, combineReducers, applyMiddlewares } from './redux/source'
import { numType, numAction, studentAction } from './redux/action'
import { numReducer } from './redux/reducer/other/redcuer_num'
import { studentReducer } from './redux/reducer/other/reducer_student'
import logger from 'redux-logger'
// import { reducer } from './redux/reducer'

// function reducer(state = 0, action) {
//     console.log(action)
//     switch (action.type) {
//         case numType.ADD_NUM:
//             return state + 1
//         case numType.DECREASE_NUM:
//             return state - 1
//         case numType.SET_NUM:
//             return action.payload
//         default:
//             return state
//     }
// }

// function logger1(store) {
//     // 返回一个dispatch创建函数
//     return function (next) {
//         console.log('logger1')
//         return function dispatch(action) {
//             next(action)
//             console.log('1', action)
//         }
//     }
// }
// function logger2(store) {
//     return function (next) {
//         console.log('logger2')
//         return function dispatch(action) {
//             next(action)
//             console.log('2', action)
//         }
//     }
// }

const reducer = combineReducers({
    num: numReducer,
    student: studentReducer,
})

console.log('=====================================')
const store = createStore(reducer, applyMiddlewares(logger), {})
const num_auto_dispacth = bindActionCreators(numAction, store.dispatch)

console.log(store)

store.subscribe(() => {
    console.log('data change1')
})

store.subscribe(() => {
    console.log('data change2')
})

num_auto_dispacth.addNum()

// store.dispatch(numAction.addNum())

store.dispatch(studentAction.addStudent({ id: 3, name: 'chen', age: 20 }))

console.log(store.getState())
