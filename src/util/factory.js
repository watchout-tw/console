import directories from '@/config/directories'

export function nestedObjProp(obj, propStr) {
  return propStr.split('.').reduce((o, i) => o[i], obj)
}

export function assembleDirectoryList(directoryID, rows) {
  var valueCol = directories[directoryID].value
  var labelCol = directories[directoryID].label
  var resultList = rows.map(row => ({
    value: nestedObjProp(row, valueCol),
    label: nestedObjProp(row, labelCol)
  }))
  var valueQue = []
  for(var i = 0; i < resultList.length; i++) {
    if(valueQue.indexOf(resultList[i].value) === -1) {
      valueQue.push(resultList[i].value)
    }else{
      resultList.splice(i, 1)
      i--
    }
  }
  return resultList
}

export function assembleOfflineDirectoryList(directoryID) {
  return directories[directoryID].options
}
