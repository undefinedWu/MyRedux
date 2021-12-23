import { http } from './http'
export function getAllStudent() {
    return http.get('/findAll')
}

// 按照条件查询学生
export function searchStudent ({ sex = -1, page = 1, size = 10, search = '' }) {
    console.log(search)
    return http.get('/searchStudent', {
        params: {
            sex,
            page,
            size,
            search,
        },
    })
}