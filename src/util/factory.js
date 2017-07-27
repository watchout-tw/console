import directories from '@/config/directories'

export function assembleDirectoryList(directoryID, rows) {
  var valueCol = directories[directoryID].value
  var labelCol = directories[directoryID].label
  return rows.map(row => ({
    value: row[valueCol],
    label: row[labelCol]
  }))
}

export function assembleOfflineDirectoryList(directoryID) {
  return directories[directoryID].options
}
