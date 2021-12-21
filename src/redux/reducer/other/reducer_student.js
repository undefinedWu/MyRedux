import { studentType } from '../../action'

// 对于每一个值的初始状态不能是undifined 因为我们很明确对它的操作
export function studentReducer(state = [], action) {
    switch (action.type) {
        case studentType.ADD_STUDENT:
            return [...state, action.payload]
        case studentType.DELETE_STUDENT:
            return state.filter(item => item.id !== action.payload.id)
        case studentType.UPDATE_STUDENT:
            return state.map(item => (item.id === action.payload.id ? { ...item, ...action.payload } : item))
        default:
            return state
    }
}
