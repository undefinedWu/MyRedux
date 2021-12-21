import { randomString } from './randomString'

export const testing = {
    INIT: {
        type: '@@redux/INIT' + randomString(5),
    },
    PROBE_UNKNOWN_ACTION: {
        type: '@@redux/PROBE_UNKNOWN_ACTION' + randomString(6),
    },
}
