import { getAllStudent } from '../../api/StudentService'
import { takeEvery, delay, take, put, select, call, apply, cps } from 'redux-saga/effects'
import { studentAction, studentType } from '../action'

// promise模式
function studentMock() {
    console.log(this, arguments)
    return new Promise((resolve, reject) => {
        if (Math.random() > 0.5) {
            resolve([
                {
                    age: 20,
                    name: 'cheng',
                },
                {
                    age: 21,
                    name: 'wang',
                },
            ])
        } else {
            reject('出错了')
        }
    })
}
// 回调模式
function MockStudent1(...params) {
    console.log(params)
    const cb = params.pop()
    setTimeout(() => {
        cb([
            {
                age: 20,
                name: 'cheng',
            },
            {
                age: 21,
                name: 'wang',
            },
        ])
    }, 2000)
}

export default function* studentTask() {
    // 此时就是会不断监听用户触发的type 并且执行对应的函数 自动run一下
    // 并且不会阻塞后续代码的执行
    // const action = yield takeEvery(studentType.ADD_STUDENT, function* () {
    //     console.log('添加学生')
    //     const result = yield 1
    //     console.log(result)
    //     此时就是会形成阻塞 并且监听了当前任务
    //     const action = yield take(studentAction.addStudent)
    //     console.log(1111, action)
    // })
    yield take(studentType.SET_STUDENT)
    yield put(studentAction.setIsLoading(true))
    // 因为如果使用了then去串联 此时在函数内部就是使用不了 yield关键字 此时就是会导致指令无法生效
    // 利用了yield关键字后面如果是一个promise 此时就是会等待当前promise变成已决 然后才会执行对应的代码 如果是rejected状态 此时就是会导致抛出错误iter.throws
    // const studentData = yield getAllStudent()
    // 参数的第二个参数之后 就是需要传递给对应函数的参数
    // 第一个参数可以是一个数组 此时数组有两项 第一项是绑定函数内部的this指向 第二项是当前需要进行和调用的异步函数
    // 第一个参数可以是一个对象 对象有两个属性组成 context、fn
    // 也可以就是一个需要被调用的函数
    try {
        // const studentData = yield call(['abc', studentMock], 1, 2, 3)
        // const studentData = yield apply('abc', studentMock, [1, 2, 3])
        const studentData = yield cps(['abc', MockStudent1], 1, 2, 3)
        yield put(studentAction.setStudent(studentData))
        yield put(studentAction.setIsLoading(false))
        // 通过函数 返回执行的数据
        const reuslt = yield select(state => state.student)
        console.log(reuslt)
    } catch (err) {
        console.log(err)
    }

    console.log('student Saga 结束')
}
