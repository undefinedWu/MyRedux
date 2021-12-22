import { numType } from '../../action'

export function numReducer(state = 0, action) {
    // console.log(action)
    switch (action.type) {
        case numType.ADD_NUM:
            return state + 1
        case numType.DECREASE_NUM:
            return state - 1
        case numType.SET_NUM:
            return action.payload
        default:
            return state
    }
}
