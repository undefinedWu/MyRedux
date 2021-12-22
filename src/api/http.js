import axios from 'axios'
import { appkey, baseURL } from './config'
const http = axios.create({
    baseURL,
})

http.interceptors.request.use(config => {
    config.params = {
        ...config.params,
        appkey,
    }
    return config
})

http.interceptors.response.use(resp => {
    if (resp.status === 200) {
        if (resp.data.status === 'success') {
            return resp.data.data
        }
    } else {
        return Promise.reject(resp)
    }
})

export { http }
