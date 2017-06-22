import axios from 'axios'

axios.defaults.baseURL = 'https://c0re.watchout.tw'

export function getSelectedFilterList (reqObj) {
  let reqUrl = `/console/lab/${reqObj.filterID}`
  return axios.get(reqUrl)
}

export function getListByNameNoPaging (reqObj) {
  let reqUrl = `/console/lab/${reqObj.pageID}`
  return axios.get(reqUrl)
}

export function getListByName (reqObj) {
  let reqUrl = `/console/lab/${reqObj.pageID}?all`
  return axios.get(reqUrl)
}

export function getListByNameWithPaging (reqObj) {
  let reqUrl = `/console/lab/${reqObj.pageID}?page=${reqObj.page}`
  return axios.get(reqUrl)
}
