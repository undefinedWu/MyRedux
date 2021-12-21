export function hasProperty(obj, key) {
    if (obj[key] === undefined) {
        throw new Error(`Expected ${key} in obj`)
    }
}
