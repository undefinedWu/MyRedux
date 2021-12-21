import { ADD_STUDENT, DELETE_STUDENT, UPDATE_STUDENT } from './student_type'

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
