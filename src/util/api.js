import directories from '@/config/directories'
import axios from 'axios'
import queryString from 'query-string'

const queryBase = {
  'name': ['committees'],
  'id': ['caucuses', 'parties']
}

const token = localStorage.getItem('watchout-token')
if(token) {
  axios.defaults.headers.common['Authorization'] = token
} else {
  console.error('Token not found')
}

function trimQueryString (query) {
  var temp = {}
  for (var key in query) {
    temp[key] = query[key]
  }
  return temp
}

function getQueryBase (pageID) {
  for (var key in queryBase) {
    if(queryBase[key].indexOf(pageID) > -1) {
      return key
    }
  }
  return 'id'
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

export function lookupTerm (reqObj) {
  let url = `/console/lab/date_to_term?date=${reqObj.timestamp}`
  return axios.get(url)
}

export function postForm (reqObj) {
  let url = `/console/lab/${reqObj.pageID}`
  return axios.post(url, reqObj.content)
}

export function patchForm (reqObj) {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('watchout-token')
  let url = `/console/lab/${reqObj.pageID}/` + reqObj.content[getQueryBase(reqObj.pageID)]
  if(reqObj.content.hasOwnProperty('id')) {
    delete reqObj.content.id
  }
  return axios.patch(url, reqObj.content)
}
