import { createActions, handleActions } from 'redux-actions'
// 主要用在使用saga的时候 需要使用actionType去监听
export const ADD_STUDENT = 'ADD_STUDENT'
export const DELETE_STUDENT = 'DELETE_STUDENT'
export const UPDATE_STUDENT = 'UPDATE_STUDENT'
export const SET_STUDENT = 'SET_STUDENT'
export const SET_ISLOADING = 'SET_ISLOADING'

// actionCreator
export const { addStudent, deleteStudent, updateStudent } = createActions({
    [ADD_STUDENT]: stu => stu,
    [DELETE_STUDENT]: id => id,
    [UPDATE_STUDENT]: stu => stu,
})

// reducer函数
export const reducer = handleActions(
    {
        [addStudent]: (state, { payload }) => [...state, payload],
        [deleteStudent]: (state, { payload }) => state.filter(it => it.id !== payload),
        [updateStudent]: (state, { payload }) => state.map(it => (it.id === payload.id ? { ...it, ...payload } : it)),
    },
    [],
)
