import directories from '@/config/directories'
import axios from 'axios'
import QueryString from 'query-string'

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
  let url = directory.api + '?' + (all ? 'all' : '') + (all && queryString ? '&' : '') + queryString
  return axios.get(url)
}

export function getListByName (reqObj) {
  let url = `${reqObj.api}?all`
  return axios.get(url)
}

export function getListByNameWithPaging (reqObj) {
  let url = `${reqObj.api}?page=${reqObj.page}`
  return axios.get(url)
}

export function getListByNameNoPaging (reqObj) {
  let url = reqObj.api
  return axios.get(url)
}

export function getListByFilter (reqObj) {
  var queryString = QueryString.stringify(reqObj.query)
  let url = `/console/lab/${reqObj.pageID}?${queryString}`
  return axios.get(url)
}

export function getItem (reqObj) {
  let url = `/console/lab/${reqObj.pageID}/${reqObj.id}`
  return axios.get(url)
}

// c0ngress!
export function lookupTerm (reqObj) {
  let url = `/c0ngress/date_to_term?date=${reqObj.timestamp}`
  return axios.get(url)
}

export function postForm (reqObj) {
  let url = `/console/lab/${reqObj.pageID}`
  return axios.post(url, reqObj.content)
}

export function patchForm (reqObj) {
  let url = `/console/lab/${reqObj.pageID}/` + reqObj.content[getQueryBase(reqObj.pageID)]
  if(reqObj.content.hasOwnProperty('id')) {
    delete reqObj.content.id
  }
  return axios.patch(url, reqObj.content)
}
