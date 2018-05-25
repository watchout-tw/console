import { isValid } from '@/util/validators'
import * as util from '@/util'

export function text2Array(text) {
  if(!text) {
    return []
  }
  return text.split('\n')
}

export function date2Timestamp(date) {
  if (!isValid(date)) return null
  if (typeof date === 'string' && date.match(util.mysqlTimestampRex)) {
    return util.mysqlTimestamp2DateObj(date).getTime()
  } else {
    return new Date(date).getTime()
  }
}

export function mapChecklist(cklist) {
  return cklist.map(item => item.id)
}

export function replaceById(element) {
  if(element.id) {
    return element.id
  }
  return element
}

export function replaceElementInArrayById(targetArray) {
  let result = []
  for(let element of targetArray) {
    if(element.id) {
      result.push(element.id)
    } else {
      result.push(element)
    }
  }
  return result
}

export function boolean2Int(bool) {
  if(bool) {
    return 1
  }
  return 0
}
export function int2Boolean(int) {
  if(int > 0) {
    return true
  }
  return false
}

export function prepareIndexId(targetArray) {
  let result = []
  for(let element of targetArray) {
    result.push(element.id)
  }
  return result
}

export function tryToParseInt(val) {
  return isNaN(val) ? val : +val
}

export function prepareName(obj) {
  return obj.name ? obj.name : ''
}

export function prepareTitle(obj) {
  return obj.title ? obj.title : ''
}

export function prepareObjId(obj) {
  return obj.id ? obj.id : null
}
