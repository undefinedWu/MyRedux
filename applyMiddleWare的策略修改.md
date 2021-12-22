## 遇到的问题

>>> 在使用自己的applyMiddlewares时，使用thunk中间件的时候，分发状态之后，并没有传递给logger中间件，此时想到的是，传递给thunk中间件，就是一开始创建仓库中的dispatch函数，进而导致了当前问题

## 一开始想到的方法

```js
export function applyMiddlewares(...middlewares) {
    return function (createStore) {
        return function (reducer, initialValue) {
            const store = createStore(reducer, initialValue)
            // 保存原本仓库中的dispatch函数 
            let dispatch = store.dispatch
            // 构建使用中间件的时候 所传递的参数store对象中所包含的两个参数
            const curState = {
                getState: store.getState,
                dispatch,
            }
            // 最终存储在store中的dispatch函数
            dispatch = compose(middlewares, curState)(dispatch)
            store.dispatch = dispatch
            // 更新对应的值 因为是引用地址传值
            curState.dispatch = dispatch
            return store
        }
    }
}
```

## 上述方法的缺陷

- 如果我们在第一次调用中间件的时候，使用变量去保存了当前中store中方法时，并且后续使用的方式当前变量去访问对应的dispatch函数，因为在上述方法中，我们后期更改了，最终存储在对象中的引用地址，而此时两者时没有关联的
（redux-thunk的源码实现 就是先保存了当前变量）

```js
    function logger (store) {
        // 后续使用的dispatch 就是如下变量 因为应用时地址传值 此时就是会保存当前的值
        const _dispatch = store.dispatch; // 没有和curState中的dispatch属性关联
        const _getState = store.getState;
        return function dispatchCreator(next) {
            return function dispatch (action) {

            }
        }
    }
```

## 修改实现方法

```js
    export function applyMiddlewares(...middlewares) {
        return function (createStore) {
            return function (reducer, initialValue) {
                const store = createStore(reducer, initialValue)
                let dispatch = store.dispatch
                
                const curState = {
                    getState: store.getState,
                    // 最终被赋值的是当前引用 就是后期使用变量接收当前值 因为作用域链的查找问题 使用到当前此法作用域的dispatch，但是它后面是已经被修改了的
                    dispatch: (..args) => dispatch(...args),
                }
                
                dispatch = compose(middlewares, curState)(dispatch)
                store.dispatch = dispatch

                return store
            }
        }
    }
```
