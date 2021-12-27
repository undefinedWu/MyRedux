/* eslint-disable no-loop-func */
// 但在yield关键字后面使用了promise的时候 我们想将promise之后的值 作为下依次调用next方法的值
//
function* iterable() {
    const value = yield new Promise(resolve => {
        setTimeout(resolve, 2000, 2)
    })
    console.log('value的值', value)
    yield 3
    yield Promise.reject(1111)
}

const generator = iterable()

// const { done, value } = generator.next()
// console.log(done, value)
// value.then(data => {
//     if (!done) {
//         console.log(generator.next(data))
//     }
// })

//
/**
 * 自动迭代生成器中的数据
 * 此函数的问题就是 因为如果返回的是promise 此时就是会导致当前
 * @param {Generator} generator
 */
function run(generator) {
    let res = generator.next()
    while (!res.done) {
        if (typeof res.value.then === 'function') {
            // 表明是一个promise
            // 将当前promise的数据传进去
            // 此时就是异步的 所以res的值 实际上一直每变化 done一致都是最开始的false
            res.value
                .then(data => {
                    res = generator.next(data)
                })
                .catch(err => {
                    res = generator.next(err)
                })
        } else {
            res = generator.next(res.value)
        }
    }
}

/**
 * 采用递归的形式
 * @param {Generator} generator
 */
function run1(generator, ...args) {
    const ans = generator.next(...args)
    if (!ans.done) {
        if (typeof ans.value.then === 'function') {
            ans.value.then(data => run1(generator, data)).catch(err => run1(generator, err))
        } else {
            run1(generator, ans.value)
        }
    }
}

run1(generator)
