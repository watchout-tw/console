import directories from '@/config/directories'
import axios from 'axios'

axios.defaults.baseURL = 'https://c0re.watchout.tw'

export function getDirectory (reqObj) {
  let directory = directories[reqObj.directoryID]
  let all = directory.paging ? directory.paging.all : false
  let url = '/console/lab/' + directory.api + (all ? '?all' : '')
  return axios.get(url)
}

export function getListByName (reqObj) {
  let url = `/console/lab/${reqObj.pageID}?all`
  return axios.get(url)
}

export function getListByNameWithPaging (reqObj) {
  let url = `/console/lab/${reqObj.pageID}?page=${reqObj.page}`
  return axios.get(url)
}

export function getListByNameNoPaging (reqObj) {
  let url = `/console/lab/${reqObj.pageID}`
  return axios.get(url)
}
