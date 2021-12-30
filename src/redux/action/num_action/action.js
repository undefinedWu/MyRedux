import {
    ADD_NUM,
    ASYNC_DECREASE_NUM,
    DECREASE_NUM,
    SET_NUM,
    ASYNC_INCREASE_NUM,
    AUTO_INCREASE_NUM,
    STOP_INCREASE,
} from './type'

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

// 异步添加
export function asyncAddNum() {
    return {
        type: ASYNC_INCREASE_NUM,
    }
}

export function asyncDecreaseNum() {
    return {
        type: ASYNC_DECREASE_NUM,
    }
}

export function autoIncrease() {
    return {
        type: AUTO_INCREASE_NUM,
    }
}

export function stopIncrease() {
    return {
        type: STOP_INCREASE,
    }
}
