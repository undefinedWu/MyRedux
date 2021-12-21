import { ADD_NUM, DECREASE_NUM, SET_NUM } from './type'

// 添加
export function addNum() {
    return {
        type: ADD_NUM,
    }
}
// 减少
export function decreaseNum() {
    return {
        type: DECREASE_NUM,
    }
}
// 设置
export function setNum(payload) {
    return {
        type: SET_NUM,
        payload,
    }
}
