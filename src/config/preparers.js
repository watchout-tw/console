export function text2Array(text) {
  return text.split('\n')
}

export function date2Timestamp(date) {
  return new Date(date).getTime()
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
