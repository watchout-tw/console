import * as types from './mutation-types'
import * as api from '@/util/api'
import directories from '@/config/directories'

export default {
  updateSelect({ commit }, reqObj) {
    const directory = directories[reqObj.directoryID]
    if(directory) {
      if(directory.api) {
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
      } else {
        // use values defined in directories.js
        if(directory.options) {
          var respObj = {
            data: directory.options,
            directoryID: reqObj.directoryID,
            uniqueID: reqObj.uniqueID
          }
          commit(types.UPDATE_SELECT, respObj)
        } else {
          commit(types.FETCH_FAIL, 'Options not found among directories')
        }
      }
    } else {
      commit(types.UPDATE_SELECT, {
        data: [],
        uniqueID: reqObj.uniqueID
      })
    }
  },
  deleteSelect({ commit }, reqObj) {
    commit(types.DELETE_SELECT, {
      uniqueID: reqObj.uniqueID
    })
  }
}
