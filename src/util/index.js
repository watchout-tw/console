export const mysqlTimestampRex = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{6}$/

export function mysqlTimestamp2DateObj (mysqlTS) {
  var t = mysqlTS.split(/[- :]/)
  return new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5])
}
