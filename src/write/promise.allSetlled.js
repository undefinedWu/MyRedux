/**
 * 关于promise.allsettled的逻辑 以及代码实现
 *
 */

// 基本使用
// 返回一个promise 参数就是可迭代对象中每一项状态以及所对应的数据 标志迭代对象中的每一项promise的状态
// 传递的参数必须是一个可迭代的对象
// 如果存在非promise项 此时就是会将其强制转换成promise的实例
const iter = [Promise.resolve(1), Promise.resolve(2), Promise.reject(3), 4, 'abc']
Promise.allSettled(iter)
    .then(data => {
        console.log('data --->', data)
    })
    .catch(err => {
        console.log(err)
    })

/**
 *
 * @param {Promise[]} iter
 * @returns {Promise}
 */
// eslint-disable-next-line no-extend-native
function mySettled(iter) {
    if (typeof iter[Symbol.iterator] !== 'function') {
        throw new Error('iter must be iteratable')
    }
    if (iter.length === 0) {
        return Promise.resolve([])
    }
    const _iter = iter.map(it => (it instanceof Promise ? it : Promise.resolve(it)))
    return new Promise((resolve, reject) => {
        const data = new Array(_iter.length)
        let count = 0
        _iter.forEach((promise, index) => {
            promise
                .then(value => {
                    data[index] = {
                        status: 'fulfilled',
                        value,
                    }
                })
                .catch(err => {
                    data[index] = {
                        status: 'rejected',
                        value: err,
                    }
                })
                .finally(() => {
                    count++
                    count === _iter.length && resolve(data)
                })
        })
    })
}
