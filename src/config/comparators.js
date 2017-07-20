export default {
  equal(haystack, needle) {
    return haystack === needle
  },
  string(haystack, needle) {
    return haystack.indexOf(needle) > -1
  },
  id(haystack, needle) {
    return haystack.id === needle
  },
  idFromList(haystack, needle) {
    return Array.isArray(haystack) ? haystack.filter(item => item.id === needle).length > 0 : false
  }
}
