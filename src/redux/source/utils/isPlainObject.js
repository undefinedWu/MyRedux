export function isPlainObject(action) {
    if (typeof action !== 'object' || action === null) {
        throw new Error('Expected action to be a object')
    }

    const __proto = Object.getPrototypeOf(action)

    if (__proto !== Object.prototype) {
        throw new Error('Expected action is a plain object')
    }
}
