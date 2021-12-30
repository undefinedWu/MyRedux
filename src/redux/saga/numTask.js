import { race, delay, put, takeEvery, fork, take, cancel, takeLatest, cancelled, call } from 'redux-saga/effects'
import { numType, numAction } from '../action'

function* asyncIncrease() {
    yield delay(2000)
    yield put(numAction.addNum())
    console.log('异步添加')
}

// function* asyncDecrease() {
//     console.log('fork 任务开始')
//     while (true) {
//         // 形成阻塞
//         yield take(numType.ASYNC_DECREASE_NUM)
//         yield delay(2000)
//         yield put(numAction.decreaseNum())
//         console.log('异步减少')
//     }
// }

function* asyncDecrease1() {
    console.log('fork 任务开始')
    while (true) {
        // 形成阻塞
        yield take(numType.ASYNC_DECREASE_NUM)
        // 不阻塞 异步去执行 使得上面能够被持续监听
        yield fork(function* () {
            yield delay(2000)
            yield put(numAction.decreaseNum())
            console.log('异步减少')
        })
    }
}

// 利用fork实现 takeEvery

// function myTakeEvery(actionType, saga) {
//     // 持续监听
//     return fork(function* () {
//         while (true) {
//             yield take(actionType)
//             // 不阻塞上面的监听
//             yield fork(saga)
//         }
//     })
// }

// 实现防抖的形式 重复触发的时候 只有最后一次才是会执行的
// 使用fork来进行实现
function* asyncDecrease2() {
    console.log('fork 任务开始')
    let task = null
    while (true) {
        // 形成阻塞
        yield take(numType.ASYNC_DECREASE_NUM)
        if (task) {
            // 取消上一次的任务
            yield cancel(task)
        }
        // 不形成阻塞 保证后面总是能够被监听
        // 保存上一次的任务对象
        task = yield fork(function* () {
            yield delay(2000)
            yield put(numAction.decreaseNum())
            console.log('异步减少')
        })
    }
}

// 使用takeLatest 主要用于保存上一次的任务对象
function* asyncDecrease3() {
    yield delay(2000)
    yield put(numAction.decreaseNum())
}
/**
 * 流程控制: 监听到autoIncrease之后 转而监听stop
 */
function* autoIncrease() {
    while (true) {
        // 只有后面停止了 才会重新监听增加
        yield take(numType.AUTO_INCREASE_NUM)
        const task = yield fork(function* () {
            try {
                while (true) {
                    yield delay(2000)
                    yield put(numAction.addNum())
                }
            } finally {
                // 即使当前任务线被取消 当前代码块的逻辑还是会执行 iter.return
                if (yield cancelled()) {
                    console.log('当前任务线被取消了')
                }
            }
        })
        yield take(numType.STOP_INCREASE)
        yield cancel()
    }
}

let isStop = false
function* autoIncrease1() {
    // 既然要增加 stop就是false
    isStop = false
    while (true) {
        yield delay(2000)
        // 利用外部进行控制当前是否结束
        if (isStop) {
            // 直接结束当前任务
            break
        }
        yield put(numAction.addNum())
    }
}

function stop() {
    isStop = true
}

function asyncAction() {
    return new Promise(resolve => {
        const time = Math.random(Math.random() * 4000 + 1000)
        if (Math.random() > 0.5) {
            setTimeout(resolve, time, { type: 1111 })
        }
    })
}

export default function* numTask() {
    // 此时不会阻塞后续代码的执行 只有分发了对应的状态 才会执行对应的函数
    // yield takeEvery(numType.ASYNC_DECREASE_NUM, asyncDecrease)
    // 会开启一个任务线 执行当前生成器中的内容
    // yield fork(asyncDecrease2)
    // yield takeLatest(numType.ASYNC_DECREASE_NUM, asyncDecrease3)
    // takeEvery 底层实现就是利用 fork 所以也是会新开一个任务线 去监听执行
    // task = yield takeEvery(numType.ASYNC_INCREASE_NUM, asyncIncrease)
    // 取消任务线
    // yield cancel(task)

    // 自动增加
    // yield fork(autoIncrease)
    // yield takeLatest(numType.AUTO_INCREASE_NUM, autoIncrease1)
    // yield takeLatest(numType.STOP_INCREASE, stop)
    yield fork(autoRaceIncrease)
    // const result = yield race({
    //     action1: call(asyncAction),
    //     action2: call(asyncAction),
    // })
    // console.log(result)
    console.log('numTask 结束')
}

function* autoRaceIncrease() {
    while (true) {
        yield take(numType.AUTO_INCREASE_NUM)
        // 都是会执行的 只要有一者结束了 整个就结束了 重新监听添加
        yield race({
            autoIncrease: call(function* () {
                while (true) {
                    yield delay(2000)
                    yield put(numAction.addNum())
                }
            }),
            cancel: take(numType.STOP_INCREASE),
        })
    }
}
