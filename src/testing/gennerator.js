function* iteratable() {
    console.log('开始执行')
    yield 1
    console.log('执行过程中')
    yield 2
    console.log('结束执行')
    return '111111'
}
// 单独只执行了当前语句 此时并不会执行内部的任何语句 只是创建了一个生成器
// const generator = iteratable()
// 此时就是可以表明 生成器是可迭代的（存在next方法） 并且是一个迭代器 （有Symbol.iterator方法）
// console.log(generator.next === generator[Symbol.iterator]().next) // 两个是相同的
// console.log(typeof generator.next)

// 就是while循环 判断done时候是false 然后获取对象中value属性
// for (const item of generator) {
//     console.log(item)
// }

// 因为当前对象是可迭代的 此时就是我们可以去控制内部代码的执行
// 通过调用next方法 此时就是从上一个yield或者开始 只想到下一个yield关键字或结束
// 执行到yeild关键字 此时就是将关键字后面的表达式计算出来 作为当前value的值 done就是内部判断是否还存在yield或这已经结束来判断最终的boolean值
// 如果执行到结束的是否 此时{value: 返回值, done: true}
// 后面再调用next方法 此时{value: undefined, done： true}
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())

function* iteratable1() {
    console.log('开始执行')
    const result1 = yield 1
    console.log('执行过程中', result1)
    const result2 = yield 2
    console.log('结束执行', result2)
    return '111111'
}
// 我们可以在next方法中传入参数 作为上一个yield关键字的返回结果
// 因为初始执行的是否 此时前面是没有yield 传参无意义
// console.log(generator.next('a'))
// console.log(generator.next('b'))
// console.log(generator.next('c'))
// console.log(generator.next('d'))
// console.log(generator.next())

function* generator1() {
    try {
        yield 1
    } catch (err) {
        console.log(err)
        yield 2
    }
    yield 3
}
// const gen = generator1()
// 就是在内部抛出错误 此时就是表示上一个yield或者开始的是否 抛出错误
// console.log(gen.next())
// console.log(gen.throw('这是一个错误'))
// 直接结束当前迭代
// console.log(gen.return())
// console.log(gen.next())

// function* iteratable() {
//     console.log('开始执行')
//     yield 1
//     console.log('执行过程中')
//     yield 2
//     console.log('结束执行')
//     return '111111'
// }

function* generator2() {
    yield 1
    // 当没有yield* 此时不会执行内部的任何代码
    // 有的时候 此时就是深入当前迭代器中进行执行
    const value = yield* iteratable()
    // 因为需要执行到下一个yield关键字 就会将迭代器创建函数的返回结果赋值给当前结果
    // 此时执行到结束 就是不会在进行迭代 而是直接返回最终的返回值
    console.log('value --->', value)
    yield 2
}

const genSpecial = generator2()
console.log(genSpecial.next())

console.log(genSpecial.next())

console.log(genSpecial.next())

console.log(genSpecial.next())
console.log(genSpecial.next()) // {value: undefined, done: true}

