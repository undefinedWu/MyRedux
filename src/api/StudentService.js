import { http } from './http'
export function getAllStudent() {
    return http.get('/findAll')
}
