import { takeEvery } from 'redux-saga/effects'
import { studentAction } from '../action'
export default function* studentTask() {
    // 此时就是会不断监听用户触发的type
    yield takeEvery(studentAction.addStudent, { id: 1, name: 'chen', age: 20 })
    console.log('student Saga 结束')
}
