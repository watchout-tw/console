export function deepClone(obj) {
  if(obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj) {
    return obj
  }
  let temp
  if(obj instanceof Date) {
    temp = new Date(obj)
  } else {
    temp = obj.constructor()
  }
  for(let key in obj) {
    if(Object.prototype.hasOwnProperty.call(obj, key)) {
      obj['isActiveClone'] = null
      temp[key] = deepClone(obj[key])
      delete obj['isActiveClone']
    }
  }
  return temp
}
