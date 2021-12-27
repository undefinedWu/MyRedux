/**
 * 前面】promise的状态会被穿透
 * @param {Promise} promise
 * @param {Function} cb
 */

function MyFinally(promise, cb) {
    if (!(promise instanceof Promise)) {
        throw new Error('promise must be a Promise instance-Object')
    }
    return promise
        .then(data => {
            // 因为在finally中执行的函数 它的状态不会决定后面的promise状态 即使报错也只是终止程序
            return Promise.resolve(cb()).then(() => data)
        })
        .catch(err => {
            return Promise.resolve(cb()).catch(() => err)
        })
}

MyFinally(
    new Promise((resolve, reject) => {
        // resolve('已决')
        reject('rejected')
        // if (Math.random() > 0.5) {
        //     console.log('111')
        // } else {
        //     console.log('reject')
        //     reject('reject')
        // }
    }),
    () => {
        throw new Error('finally Erro')
        console.log('finally')
    },
)
// new Promise((resolve, reject) => {
//     // resolve('已决')
//     reject('rejected')
//     // if (Math.random() > 0.5) {
//     //     console.log('111')
//     // } else {
//     //     console.log('reject')
//     //     reject('reject')
//     // }
// })
//     .finally(() => {
//         throw new Error('finally Erro')
//         console.log('finally')
//     })
//     .then(data => {
//         console.log('data --->', data)
//     })
//     .catch(err => {
//         console.log('err --->', err)
//     })
