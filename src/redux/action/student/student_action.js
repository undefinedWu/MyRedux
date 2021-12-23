import { ADD_STUDENT, DELETE_STUDENT, UPDATE_STUDENT, SET_STUDENT, SET_ISLOADING } from './student_type'
import { getAllStudent, searchStudent } from '../../../api/StudentService'
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
    console.log(payload)
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

export function fetchSearchStudent(condition = {}) {
    // return searchStudent(condition).then(data => ({
    //     type: SET_STUDENT,
    //     payload: data.searchList,
    // }))
    // return setStudent(getAllStudent())
    // 非fsa 而当前action并不是一个promise 此时就是直接移交给后面的中间件了
    return {
        type: SET_STUDENT,
        payload: getAllStudent(),
    }
    // 此时就是遵循fsa格式
    // return {
    //     type: 'set-student',
    //     payload: getAllStudent(),
    // }
    // return getAllStudent().then(data => setStudent(data))
}

