import commonActions from 'common/src/store/actions'
import * as types from './mutation-types'
import * as api from '@/util/api'
import * as factory from '@/util/factory'
import directories from '@/config/directories'

const localActions = {
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
  updateSelectCrossSection({ commit }, reqObj) {
    api.getItem({
      api: reqObj.api,
      id: reqObj.id
    }).then(response => {
      let options = []
      let values = []
      for(let data of response.data[reqObj.keyName]) {
        if(values.indexOf(data[reqObj.valueName]) === -1) {
          values.push(data[reqObj.valueName])
          options.push({
            'value': data[reqObj.valueName],
            'label': data[reqObj.labelName]
          })
        }
      }
      let respObj = {
        data: options,
        uniqueID: reqObj.uniqueID
      }
      commit(types.UPDATE_SELECT, respObj)
    })
  },
  deleteSelect({ commit }, reqObj) {
    commit(types.DELETE_SELECT, {
      uniqueID: reqObj.uniqueID
    })
  }
}

export default Object.assign(commonActions, localActions)
