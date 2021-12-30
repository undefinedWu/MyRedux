import { createAction } from 'redux-actions'
export const ADD_NUM = Symbol('add_num')
export const DECREASE_NUM = Symbol('decrease_num')
export const SET_NUM = Symbol('set_num')
export const ASYNC_INCREASE_NUM = Symbol('async-increase-num')
export const ASYNC_DECREASE_NUM = Symbol('async-decrease-num')
export const AUTO_INCREASE_NUM = Symbol('auto-increase-num')
export const STOP_INCREASE = Symbol('stop-increase')

const addNumCreator = createAction(ADD_NUM)
console.log(addNumCreator)
