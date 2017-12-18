import directories from '@/config/directories'

export function nestedObjProp(obj, propStr) {
  return propStr.split('.').reduce((o, i) => {
    return o[i] ? o[i] : ''
  }, obj)
}

export function assembleDirectoryList(directoryID, rows) {
  var valueCol = directories[directoryID].value
  var labelCol = directories[directoryID].label
  var resultList
  if (typeof labelCol === 'string') {
    resultList = rows.map(row => ({
      value: nestedObjProp(row, valueCol),
      label: nestedObjProp(row, labelCol)
    }))
  } else { // else will be array
    resultList = rows.map(row => {
      var compoundLabel = labelCol.reduce((a, b) => {
        return nestedObjProp(row, a) + ' - ' + nestedObjProp(row, b)
      })
      return {
        value: nestedObjProp(row, valueCol),
        label: compoundLabel
      }
    })
  }
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
