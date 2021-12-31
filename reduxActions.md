# redux-actions

*遵循flux标准,此时就需要尽可能的保证type值是一个字符串, 用于简化action、actionCreaotr、reducer的书写，将actionType，actionCreator，reducer书写到一个模块中(间接绑定)*

## createAction(s): 根据actionType创建actionCreator

**actionCreator的toString方法是被重写了的 返回对应的参数对象的key（就是actionType），主要用于和其他进行结合**

### createAction(actionType, payloadFunc, metaFunc) 创建单个actionCreator

如果当前action有payload，第二个参数就是**传递一个函数**，函数的返回值就是payload，实际调用的actionCreator的时候，参数就会传递给payloadFunc
如果需要携带一些额外的字段，第三个参数也是一个函数，可以让返回的action对象中存在meta字段 就是函数的返回值

### createActions(obje: Record<string, payloadFunc>): Record<string, actionCreator>

参数对象中的value 就是书写对应的payload函数
返回对象的key就是参数对象的key变成小驼峰命名
返回对象的value就是对应的actionCreator函数 调用actionCreator 返回action的type 就是参数对象中的key

## handleAction(s)(actionType | actionCreator, (state, action) => newState, stateDefault)针对actionType使用reducer进行处理

### handleAction(actionType, reducer, defaultState) 就是返回一个reducer函数

此时返回的函数，就是只有两种状态 actionType和没匹配上的type

### handleActions(Record<string, handler>, defaultState) 返回一个reduer函数

此时是reducer的状态就是参数对象的key，handler就是对应的处理函数
**对应key也可以使用对应的 actionCreator 因为上面存在重载的toString方法 间接绑定了actionType**

## combineActions(...actionType) 多个类型触发同一个逻辑的返回状态函数

返回值就是一个对象 有一个tostring方法**将类型进行拼接联合** 统一都是交给handleActions进行处理
