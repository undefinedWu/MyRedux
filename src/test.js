import { createStore, bindActionCreators, combineReducers, applyMiddlewares } from './redux/source'
import { numType, numAction, studentAction } from './redux/action'
import { numReducer } from './redux/reducer/other/redcuer_num'
import { studentReducer } from './redux/reducer/other/reducer_student'
import logger from 'redux-logger'
// import thunk from 'redux-thunk'
import thunk from './redux/middleWare/redux-thunk'

// import { getAllStudent } from './api/StudentService'
// const arr = []
// import logger from 'redux-logger'
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

// function logger1 (store) {
//     arr.push(store)
//     // 返回一个dispatch创建函数
//     return function (next) {
//         // console.log('logger1')
//         return function dispatch(action) {
//             next(action)
//             // console.log('1', action)
//         }
//     }
// }

// function logger2 (store) {
//     arr.push(store)
//     return function (next) {
//         // console.log('logger2')
//         return function dispatch(action) {
//             next(action)
//             // console.log('2', action)
//         }
//     }
// }

const reducer = combineReducers({
    num: numReducer,
    student: studentReducer,
})

const store = createStore(reducer, applyMiddlewares(thunk.withExtraArgument({ test: '这是额外的数据' }), logger), {})

// const store = applyMiddlewares(logger1, logger2)(createStore)(reducer, {})
// const num_auto_dispacth = bindActionCreators(numAction, store.dispatch)

// store.subscribe(() => {
//     console.log('data change1')
// })

// store.subscribe(() => {
//     console.log('data change2')
// })

// num_auto_dispacth.addNum()

// store.dispatch(numAction.addNum())

// store.dispatch(studentAction.addStudent({ id: 3, name: 'chen', age: 20 }))

// 如果我们在请求数据的时候 此时就是需要做一系列的改变仓库状态
// 当使用thunk中间件 此时action创建函数就可以返回一个函数（支持异步）
// store.dispatch(studentAction.setIsLoading(true))
// getAllStudent().then(data => {
//     store.dispatch(studentAction.setStudent(data))
//     store.dispatch(studentAction.setIsLoading(false))
//     console.log(data)
// })

window.dispatch2 = store.dispatch

store.dispatch(studentAction.fetchStudent())