import * as types from './mutation-types'
import * as api from '@/util/api'
import directories from '@/config/directories'

export default {
  updateSelect ({ commit }, reqObj) {
    const directory = directories[reqObj.directoryID]
    if(!directory.api) {
      // use values defined in directories.js
      if(directory.values) {
        var respObj = {
          data: directory.values,
          directoryID: reqObj.directoryID,
          uniqueID: reqObj.uniqueID
        }
        commit(types.UPDATE_SELECT, respObj)
      } else {
        commit(types.FETCH_FAIL, 'Values not defined in directories.js')
      }
    } else {
      // fetch values from API
      api.getDirectory(reqObj).then(response => {
        var valueCol = directories[reqObj.directoryID].value
        var labelCol = directories[reqObj.directoryID].label
        var respObj = {
          data: response.data.rows.map(row => {
            return {
              value: row[valueCol],
              label: row[labelCol]
            }
          }),
          directoryID: reqObj.directoryID,
          uniqueID: reqObj.uniqueID
        }
        commit(types.UPDATE_SELECT, respObj)
      }).catch(error => {
        commit(types.FETCH_FAIL, error)
      })
    }
  }
}
