import { studentType } from '../../action'

const initialValue = {
    // 学生数组
    studentDatas: [],
    // 时候正在加载
    isLoading: false,
}

// 对于每一个值的初始状态不能是undifined 因为我们很明确对它的操作
export function studentReducer(state = initialValue, action) {
    switch (action.type) {
        case studentType.ADD_STUDENT:
            return {
                ...state,
                studentDatas: [...state.studentDatas, action.payload],
            }
        case studentType.DELETE_STUDENT:
            return {
                ...state,
                studentDatas: state.studentDatas.filter(item => item.id !== action.payload.id),
            }
        case studentType.UPDATE_STUDENT:
            return {
                ...state,
                studentDatas: state.studentDatas.map(item =>
                    item.id === action.payload.id ? { ...item, ...action.payload } : item,
                ),
            }
        case studentType.SET_STUDENT:
            return {
                ...state,
                studentDatas: action.payload,
            }
        case studentType.SET_ISLOADING:
            return {
                ...state,
                isLoading: action.payload,
            }
        default:
            return state
    }
}
