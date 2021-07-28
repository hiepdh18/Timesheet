
const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && object[key] !== undefined) {
            obj[key] = object[key];
        }
        return obj
    }, {})
}
export default pick;