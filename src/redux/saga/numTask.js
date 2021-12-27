import { take } from 'redux-saga/effects'
import { numType } from '../action'

export default function* numTask() {
    // 此时就是可以保证saga任务不会结束
    // while (true) {
    // 会阻塞后续代码的执行 监听add_num这个分action的type
    // 分发了对应type的action时，才会执行继续执行
    yield take(numType.ADD_NUM)
    console.log('执行num saga任务')

    // 如果yield关键字后面的是一个promise 此时就是会等待它编程已决的状态 然后继续往后执行
    // 如果promise的状态最终变成rejected状态 就是会抛出错误 就是相当于 iter.throw
    // try {
    //     const result = yield new Promise((resolve, reject) => {
    //         console.log('promise中')
    //         setTimeout(reject, 300, 'rejected')
    //     })
    //     console.log('result --->', result)
    // } catch (err) {
    //     console.log(err)
    // }
    // console.log('saga任务结束')
    // }
}
