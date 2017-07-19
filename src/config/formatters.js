import directories from './directories'

const punct = {
  separator: '、',
  colon: '：'
}
let arrayJoinAtIndex = (array = [], index, separator = punct.separator) => {
  return array.map(item => item[index]).join(separator)
}
let number = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九']
let termString = term => `第${number[term]}屆`

export default {
  date(row, col) {
    return row[col.property] ? new Date(row[col.property]).toLocaleDateString('zh-Hans-TW') : ''
  },
  sessions(row, col) {
    const sessions = row.sessions ? row.sessions : []
    return sessions
      .map(session => `${session.session_index}-${session.temp_session_index}`)
      .join(punct.separator)
  },
  title(row, col) {
    console.log(row, col)
    return row[col.property] ? row[col.property].title : ''
  },
  name(row, col) {
    return row[col.property] ? row[col.property].name : ''
  },
  list_abbreviations(row, col) {
    return row[col.property] ? arrayJoinAtIndex(row[col.property], 'abbreviation') : ''
  },
  list_titles(row, col) {
    return row[col.property] ? arrayJoinAtIndex(row[col.property], 'title') : ''
  },
  list_names(row, col) {
    return row[col.property] ? arrayJoinAtIndex(row[col.property], 'name') : ''
  },
  list_questions(row, col) {
    return row[col.property] ? arrayJoinAtIndex(row[col.property], 'question') : ''
  },
  rep_history(row, col) {
    const history = row.history ? row.history : []
    return history
      .filter(event => !!event.term)
      .map(event => {
        var eventStr = `${termString(event.term)}`
        eventStr += event.party && event.party.abbreviation ? event.party.abbreviation : ''
        eventStr += event.district && event.district.abbreviation ? event.district.abbreviation : ''
        return eventStr
      })
      .join(punct.separator)
  },
  committee_category(row, col) {
    let value = row[col.property]
    return directories.committee_category.options
      .filter(option => option.value === value)
      .pop()
      .label
  },
  st(row, col) {
    return row.st.title
  }
}
