export function randomString(len = 5) {
    return Math.random().toString(36).slice(-len).split('').join('.')
}
