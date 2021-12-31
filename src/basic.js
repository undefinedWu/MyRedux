import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import { reducer as num, addNum, setNum } from './redux/action/num_action/type'
import { reducer as student, addStudent, updateStudent } from './redux/action/student/student_type'
const reducer = combineReducers({
    num,
    student,
})
const store = createStore(reducer, applyMiddleware(logger))

store.dispatch(addNum())
store.dispatch(setNum(8))

store.dispatch(addStudent({ id: 1, name: 'chen', age: 20 }))
store.dispatch(updateStudent({ id: 1, name: 'wang1' }))
