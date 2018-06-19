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
  let url = `${reqObj.api}/${reqObj.id}`
  return axios.get(url)
}

// c0ngress!
export function lookupTerm (reqObj) {
  let url = `/c0ngress/date_to_term?date=${reqObj.timestamp}`
  return axios.get(url)
}

export function lookupParty (reqObj) {
  let url = `/c0ngress/date_to_rep_info?date=${reqObj.timestamp}`
  if(reqObj.reps && reqObj.reps.length > 0) {
    url += '&reps=['
    for(let i = 0; i < reqObj.reps.length; i++) {
      url += reqObj.reps[i]
      if(i !== reqObj.reps.length - 1) {
        url += ','
      }
    }
    url += ']'
  }
  return axios.get(url)
}

export function postForm (reqObj) {
  let url = reqObj.api
  return axios.post(url, reqObj.content)
}

export function patchForm (reqObj) {
  let url = `${reqObj.api}/${reqObj.content[getQueryBase(reqObj.page.id)]}`
  if (reqObj.content.hasOwnProperty('id')) {
    delete reqObj.content.id
  }
  return axios.patch(url, reqObj.content)
}
