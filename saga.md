# saga的基本使用

## 基本概念

使用saga中间件之后，此时就是需要启动一个saga任务（主要就是监听用户去分发的一些action），saga任务就是一个**生成器**，内部会自动调用，但在yield后面碰到内部的指令，就可能会阻塞/非阻塞生成器的调用，有可能形成了一些action的监听。
**saga接受到任何dispatch的action，都先会直接完后进行移交，然后再判断自己的监听任务中时候是否监听了当前actionType，然后去执行对应的。所以在一般情况下，为了不改动reducer，我们都是会分发不存在的action，让saga监听到，执行对应的逻辑，逻辑中分发真正的action，改动仓库中的数据；虽然原本分发的action，是不会再reducer中匹配到，因此不会对数据仓库中的数据改动**

```markdown
    但生成器中的任务都执行完成了，此时saga任务就是会结束，但是正常情况，saga任务都是不会结束的
```

## 自执行的saga任务

正常情况下，我们启动saga任务之后，对应的生成器都是会自动进行执行的，如果yield后面是saga中的指令，此时就是按照saga中的规则进行执行，如果是一个promise，就会等待当前promise变成已决，如果状态是fulfilled，就执行iter.next(resolveData), 如果是rejected，就执行iter.throw(rejectedData)，如果是其他数据，就直接iter.next(otherData)

## 其他概念

1. 阻塞: 阻塞当前任务线，因为Generator是自执行的，碰到阻塞，就需要满足一定的条件，才能继续自执行

## 基本指令

*所有的指令都必须放在**yield**关键字后面，这样才能让saga根据触发的指令，做不同的操作*

- take(actionType)： **阻塞**监听**一次**actionType， 只有分发了当前actionType，生成器才会继续往后进行调用

- all(iterator[]): 就是数组中的所有saga任务都结束了，当前指令才算完成

- takeEvery(actionType, Generator)： **非阻塞**的不间断监听触发**actionType**，就会**自执行**对应的Generator ---> 本质就是新开了一条任务线去监听对应的actionType

- delay(time)： 此时就是会阻塞当前后面的执行（内部实现原理可能是利用一个promise在指定时间后变成已决状态）

- put(action)： 分发一个状态，就是相当于store中的dispatch函数

- call([thisArg, func], ...params: any[]): 就是去调用一个异步（**promise形式**）函数(**可以通过传递参数的方式不同，改变传递给函数的参数，和内部的this指向问题**)

- apply: 和call一样，只是调用传递的参数形式不一样

- select(fn?: state => 要使用的数据): 就是获取存储在state中的【指定】数据

- cps: 其实和call、apply一样，使用的场景就是**回调模式的异步**

```js
// 参数的最后一个就是内部传递的回调函数， 获取到对应的数据
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
// 也可修改函数内部this指向，以及传递参数给对应的函数 
yield cps(MockStudent1)
```

- fork(Generator): 就是并行的开启一个**任务**,不会阻塞所在的任务线  ===> 返回一个Task对象

```js
function* asyncIncrease() {
    yield delay(2000)
    yield put(numAction.addNum())
    console.log('异步添加')
}

function* asyncDecrease1() {
    console.log('fork 任务开始')
    while (true) {
        yield take(numType.ASYNC_DECREASE_NUM)
        yield delay(2000)
        yield put(numAction.decreaseNum())
        console.log('异步减少')
    }
}

// 对上面方法进行改进 让每一次分发async_increase_num的时候 都能分发一次decreaseNum
// 此时就是需要利用fork不会阻塞 在当前任务线开启一个新的任务线进行监听 并自执行Generator
function* asyncDecrease2() {
    console.log('fork 任务开始')
    while (true) {
        yield take(numType.ASYNC_DECREASE_NUM)
        yield fork(function* () {
             yield delay(2000)
            yield put(numAction.decreaseNum())
            console.log('异步减少')
        })
    }
}

export default function* numTask() {
    yield fork(asyncDecrease)
    yield takeEvery(numType.ASYNC_INCREASE_NUM, asyncIncrease1)
    console.log('numTask 结束')
}

// 在如上场景下 如果重复触发 dispatch({type: numType.ASYNC_INCREASE_NUM}) 执行一次就是后面就会分发依次 addNum
// 但是如果重复触发 dispatch({type: numType.ASYNC_DECREASE_NUM}) 此次就是只会有一次分发 decreaseNum 
// 因为第一次执行完take之后 就没有再进行监听（只监听了一次） 后面执行delay {type: numType.ASYNC_DECREASE_NUM} 重复触发就是无效的
// take采取的是发布订阅的模式 就是执行完成后就是不会执行 需要等执行万descreaseNum之后 此时才能继续监听对应的actionType

```

```js 使用fork实现一次 做一个防抖的形式
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
        // 不形成阻塞 保证需要分发的总是能够被监听
        // 保存上一次的任务对象
        task = yield fork(function* () {
            yield delay(2000)
            yield put(numAction.decreaseNum())
            console.log('异步减少')
        })
    }
}
yield fork(asyncDecrease2);

// 使用takeLatest 就是重复dispatch一个action的时候 会先取消上一次任务
yield takeLatest(numType.ASYNC_DECREASE_NUM, function* () {
    yield delay(2000);
    yield put(numAction.decreaseNum())
})
```

```js 做一个自动增加和暂停的
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
// 方法二
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

yield takeLatest(numType.AUTO_INCREASE_NUM, autoIncrease1)

// 方法三 使用race的形式
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
yield fork(autoRaceIncrease)
```

- cancel(...Tasks): 就是取消一个或多个任务,实际上就是使用generator.return。可以不传递参数，就是取消直接所在的

- takeLatest： 功能和takeEvery保持一致，但是重复监听到，就先销毁前一次的任务线

- cancelled: 就是判断所在任务线时候被取消了。在fianlly模块中的代码是肯定会执行的，然后判断当前任务线是否被取消，进而决定是否执行某代码

- race： 阻塞，可以传递**多个指令**，当有其中一个指令执行结束了，当前指令就直接结束。并且当前指令会自动取消其他的任务
