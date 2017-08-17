export function text2Array (text) {
  return text.split('\n')
}

export function date2Timestamp (date) {
  return new Date(date).getTime()
}

export function mapChecklist (cklist) {
  return cklist.map(item => item.id)
}

export function replaceById (element) {
  if(element.id) {
    return element.id
  }
  return element
}

export function boolean2Int (bool) {
  if(bool) {
    return 1
  }
  return 0
}
