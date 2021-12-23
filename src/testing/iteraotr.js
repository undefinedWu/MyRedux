// 迭代器： 就是对象存在一个next方法，当前方法被调用之后，会返回一个对象包括value和done属性 value表示当前的值 done表示是否还能进行迭代
// 迭代器创建函数： 就是一个返回迭代器
// 可迭代协议： 就是存在知名属性 [Symbol.iterator] ,它是一个迭代器创建函数

const { isThisTypeNode, convertToObject } = require('typescript')

// 此时就是表示迭代器
const iterator = {
    i: 0,
    total: 3,
    next() {
        const obj = {
            value: this.i < this.total ? this.i : undefined,
            done: this.i >= this.total,
        }
        this.i++
        return obj
    },
}

// 产生一个可以进行无限递归的迭代器
const iter = {
    i: 0,
    next() {
        return {
            value: this.i++,
            done: false,
        }
    },
}

// 利用迭代的方式 产生一个feibolaqie

const feibo = {
    first: 1,
    second: 1,
    curIndex: 1, // 表示当前所在项
    next() {
        if (this.curIndex <= 2) {
            this.curIndex++
            return {
                value: 1,
                done: false,
            }
        }
        const obj = {
            value: this.first + this.second,
            done: false,
        }
        this.curIndex++
        this.first = this.second
        this.second = obj.value
        return obj
    },
}

// 限制feibo的输出项范围 此时就是一个迭代器创建函数
function feiboFunc(limit = 1) {
    return {
        first: 1,
        second: 1,
        curIndex: 1,
        next() {
            // 在超过当前上限的是否 此时就是直接返回
            if (this.curIndex > limit) {
                return {
                    value: undefined,
                    done: true,
                }
            }
            if (this.curIndex <= 2) {
                this.curIndex++
                return {
                    value: 1,
                    done: false,
                }
            }
            const obj = {
                value: this.first + this.second,
                done: false,
            }
            this.curIndex++
            this.first = this.second
            this.second = obj.value
            return obj
        },
    }
}

// 对于数组的迭代
function iterArray(arr) {
    return {
        i: 0,
        next() {
            return {
                value: arr[this.i++],
                done: this.i > arr.length,
            }
        },
    }
}

const arr = [1, 2, 3, 4, 5, 6, 7]
const it = iterArray(arr)
let res = it.next()
while (!res.done) {
    console.log(res.value)
    res = it.next()
}

console.log('===============')
for (const item of arr) {
    console.log(item)
}
