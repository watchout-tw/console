import * as types from './mutation-types'
import * as api from '@/util/api'
import * as factory from '@/util/factory'
import directories from '@/config/directories'

export default {
  updateSelect({ commit }, reqObj) {
    const directory = directories[reqObj.directoryID]
    if(directory) {
      if(directory.api) {
        // fetch values from API
        api.getDirectory(reqObj).then(response => {
          let respObj = {
            data: factory.assembleDirectoryList(reqObj.directoryID, response.data.rows),
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
          commit(types.DIRECTORY_NOT_FOUND)
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
