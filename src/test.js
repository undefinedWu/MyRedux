import { createStore, combineReducers, applyMiddlewares } from './redux/source'
import { studentAction, numAction } from './redux/action'
import { numReducer } from './redux/reducer/other/redcuer_num'
import { studentReducer } from './redux/reducer/other/reducer_student'
import logger from 'redux-logger'
// import thunk from 'redux-thunk'
// import thunk from './redux/middleWare/redux-thunk'
// import promise from 'redux-promise'
// import promise from './redux/middleWare/redux-promise'
import createSagaMiddleware from 'redux-saga'
import RootSaga from './redux/saga'
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

// 创建一个saga中间件
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    applyMiddlewares(sagaMiddleware, logger),
    {},
)

// 启动saga任务 需要传递一个生成器
// 立即被执行了（自动） 被run了 
// 在yield关键字后面是一个saga指令 此时才有可能形成阻塞形式
sagaMiddleware.run(RootSaga)

window.increase = function () {
    store.dispatch(numAction.addNum())
}
window.asyncIncrease = function () {
    store.dispatch(numAction.asyncAddNum())
}
window.asyncDecrease = function () {
    store.dispatch(numAction.asyncDecreaseNum())
}
window.addStudent = function () {
    store.dispatch(studentAction.addStudent({ name: 'chen', age: 20, sex: 1 }))
}
window.setStudent = function () {
    store.dispatch(studentAction.setStudent([]))
}
// const store = applyMiddlewares(logger1, logger2)(createStore)(reducer, {})
// const num_auto_dispatch = bindActionCreators(numAction, store.dispatch)

// store.subscribe(() => {
//     console.log('data change1')
// })

// store.subscribe(() => {
//     console.log('data change2')
// })

// num_auto_dispatch.addNum()

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

// store.dispatch(studentAction.fetchStudent())
// 就是搜索一个
// store.dispatch(studentAction.fetchSearchStudent({ search: '安路' }))
