import { ADD_STUDENT, DELETE_STUDENT, UPDATE_STUDENT, SET_STUDENT, SET_ISLOADING } from './student_type'
import { getAllStudent } from '../../../api/StudentService'
export function addStudent(payload) {
    return {
        type: ADD_STUDENT,
        payload,
    }
}

export function deleteStudent(id) {
    return {
        type: DELETE_STUDENT,
        payload: id,
    }
}

export function updateStudent(payload) {
    return {
        type: UPDATE_STUDENT,
        payload,
    }
}

export function setStudent(payload) {
    return {
        type: SET_STUDENT,
        payload,
    }
}

export function setIsLoading(payload) {
    return {
        type: SET_ISLOADING,
        payload,
    }
}

export function fetchStudent() {
    return async (dispacth, getState, extra) => {
        console.log(extra)
        // 保存传递给当前中间件dispatch
        // window.$dispacth2 = dispacth
        dispacth(setIsLoading(true))

        const result = await getAllStudent()
        dispacth(setStudent(result))

        dispacth(setIsLoading(false))
    }
}
