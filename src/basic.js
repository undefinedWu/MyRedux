import { createStore, bindActionCreators, applyMiddleware } from 'redux'
import { numType, numAction, studentAction } from './redux/action'
import reducer from './redux/reducer'

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
// 本质就是一个洋葱模型
// 中间件的本质就是修改dispatch函数 因为在当前函数 我们可以拿到oldState、action、newState
// 中间件是一个dispatch创建函数
// 中间件被传递一个参数 store store就是仓库对象 但是只存在两个属性 getState => 获取状态 dispatch最终存储在仓库中的dispatch函数
// dispatch创建函数被传递一个参数 下一个中间件返回的dispatch函数 如果当前中间件是最后一个中间件 此时就是会原本存储在仓库中的dispatch函数
// 最终本质就是得到一个dispatch函数 所以此时就是会返回
// 并且只有最后的一个中间进行了移交 此时才会使得仓库中的值发生变化
function logger1(store) {
    // 返回一个dispatch创建函数
    return function (next) {
        console.log('logger1')
        return function dispatch(action) {
            next(action)
            console.log('1', action)
        }
    }
}
function logger2(store) {
    return function (next) {
        console.log('logger2')
        return function dispatch(action) {
            next(action)
            console.log('2', action)
        }
    }
}

// action必须时一个plain-object
// 在使用combineReducer的时候 也是会分发两次状态
// 在初次创建store之后 会调用一次reducer 主要就是检查是否在默认状态下返回本身
// 订阅一个函数之后 会返回一个取消当前订阅的函数

// 创建store的方式
// const store = createStore(reducer, applyMiddleware(logger1, logger2))
const store = applyMiddleware(logger1, logger2)(createStore)(reducer)

console.log(store)

// 只是传递一个函数的时候 此时就是会返回对应函数的自动分发状态函数
// 如果时传递一个对象 对象的每个属性value都是 action创建函数 此时返回的也是一个对象 对象的key和原本保持一致 但是函数变成自动分发的函数
const newNumAction = bindActionCreators(numAction, store.dispatch)
console.log(newNumAction)

const unListen = store.subscribe(() => {
    console.log('data change')
})

// 此时就是可以自动分发状态
newNumAction.addNum()
// store.dispatch(numAction.addNum())
unListen()

// store.dispatch(studentAction.addStudent({ id: 3, name: 'chen', age: 20 }))
// store.dispatch(studentAction.updateStudent({ id: 3, name: 'wang1' }))
console.log(store.getState())
