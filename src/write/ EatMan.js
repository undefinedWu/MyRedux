/**
 * 本质就是一个链式调用的问题
 * 实现一个EatMan
 * 说明：实现一个EatMan，EatMan可以有以下一些行为

* 示例：

* 1. EatMan("Hank”)输出:

* Hi! This is Hank!

* 2. EatMan(“Hank”).eat(“dinner”).eat(“supper”)输出

* Hi This is Hank!

* Eat dinner~

* Eat supper~

* 3. EatMan(“Hank”).eat('dinner').eatFirst(“lunch”)输出

* Eat lunch~

* Hi This is Hank!

* Eat supper~

* 4. EatMan(“Hank”).eat('dinner').eatFirst(“lunch”).eatFirst("breakfast")输出

* Eat breakfast~

* Eat lunch~

* Hi This is Hank!

* Eat dinner~

*/

// eslint-disable-next-line import/no-anonymous-default-export
function EatMan(params) {
    return new (class {
        stdOutput = [] // 记录最终需要输出的信息
        constructor(params) {
            this.stdOutput.push(`Hi, This is ${params}!`)
            setTimeout(() => {
                this.stdOutput.forEach(param => console.log(param))
            }, 0)
        }
        eat(params) {
            this.stdOutput.push(`Eat ${params}~`)
            return this
        }
        eatFirst(params) {
            this.stdOutput.unshift(`Eat ${params}~`)
            return this
        }
    })(params)
}

// EatMan('Hank')
// EatMan('Hank').eat('dinner').eat('supper')
// EatMan('Hank').eat('dinner').eatFirst('lunch')
EatMan('Hank').eat('dinner').eatFirst('lunch').eatFirst('breakfast')
