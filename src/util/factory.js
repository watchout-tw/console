import directories from '@/config/directories'

export function nestedObjProp(obj, propStr) {
  return propStr.split('.').reduce((o, i) => o[i], obj)
}

export function assembleDirectoryList(directoryID, rows) {
  var valueCol = directories[directoryID].value
  var labelCol = directories[directoryID].label
  return rows.map(row => ({
    value: nestedObjProp(row, valueCol),
    label: nestedObjProp(row, labelCol)
  }))
}

export function assembleOfflineDirectoryList(directoryID) {
  return directories[directoryID].options
}
