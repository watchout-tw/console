import directories from '@/config/directories'
import axios from 'axios'
import queryString from 'query-string'

function trimQueryString (query) {
  var temp = {}
  for (var key in query) {
    temp[key] = query[key] ? query[key] : undefined
  }
  return temp
}

export function getDirectory (reqObj) {
  let directory = directories[reqObj.directoryID]
  let all = directory.paging ? directory.paging.all : false

  let parameters = reqObj.parameters ? reqObj.parameters : {}
  let queryString = Object.keys(parameters)
    .reduce((a, k) => {
      a.push(k + '=' + encodeURIComponent(parameters[k]))
      return a
    }, [])
    .join('&')
  let url = '/console/lab/' + directory.api + '?' + (all ? 'all' : '') + (all && queryString ? '&' : '') + queryString
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

export function getListByFilter (reqObj) {
  var query = queryString.stringify(trimQueryString(reqObj.queryParameters))
  let url = `/console/lab/${reqObj.pageID}?${query}`
  return axios.get(url)
}

export function getItem (reqObj) {
  let url = `/console/lab/${reqObj.pageID}/${reqObj.id}`
  return axios.get(url)
}

export function postMockForm (reqObj) {
  // let url = `/console/lab/${reqObj.pageID}`
  // return axios.post(url, reqObj.content)
  return new Promise((resolve, reject) => {
    resolve({
      data: reqObj
    })
  })
}
