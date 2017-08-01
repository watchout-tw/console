export function text2Array (text) {
  return text.split('\n')
}

export function date2Timestamp (date) {
  return new Date(date).getTime()
}
