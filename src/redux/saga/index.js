import { all } from 'redux-saga/effects'

import numTask from './numTask'
import studentTask from './studentTask'
export default function* RootSaga() {
    // 正常情况下 我们可能会采用模块去控制每一个模块的saga任务
    // all 就是会等所有模块的sage任务结束后 当前sage才会结束
    // 会依次自动执行数组中的每一个saga任务 直至结束 结束了就是不会再执行对应的saga任务
    console.log('RootSaga 任务开始')
    yield all([numTask(), studentTask()])
    console.log('RootSaga 任务结束')
}
