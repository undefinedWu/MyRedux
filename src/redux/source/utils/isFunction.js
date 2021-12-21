export function isFunction(fn) {
    if (typeof fn !== 'function') {
        throw new Error('Expected fn is a fucntion')
    }
}
