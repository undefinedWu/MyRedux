import { numReducer } from './other/redcuer_num'
import { studentReducer } from './other/reducer_student'
import { combineReducers } from 'redux'

// export function reducer(state = {}, action) {
//     const newState = {
//         num: numReducer(state.num, action),
//         student: studentReducer(state.student, action),
//     }
//     return newState
// }

export default combineReducers({
    num: numReducer,
    student: studentReducer,
})
// 合并redeucer的时候 此时就是比必须是一个对象 key就是存储在store中将 value就是一个reducer函数
// export default combineReducers(numReducer)
