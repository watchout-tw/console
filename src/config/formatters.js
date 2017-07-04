import directories from './directories'

const mandarinComma = '、'
let arrayJoinAtIndex = (array = [], index, separator = mandarinComma) => {
  return array.map(item => item[index]).join(separator)
}

export default {
  date(row, col) {
    return new Date(row[col.property]).toLocaleDateString('zh-Hans-TW')
  },
  sessions(row, col) {
    return row.sessions
      .map(session => `${session.session_index}-${session.temp_session_index}`)
      .join(mandarinComma)
  },
  title(row, col) {
    return row[col.property].title
  },
  name(row, col) {
    return row[col.property].name
  },
  list_abbreviations(row, col) {
    return arrayJoinAtIndex(row[col.property], 'abbreviation')
  },
  list_titles(row, col) {
    return arrayJoinAtIndex(row[col.property], 'title')
  },
  list_names(row, col) {
    return arrayJoinAtIndex(row[col.property], 'name')
  },
  list_questions(row, col) {
    return arrayJoinAtIndex(row[col.property], 'question')
  },
  rep_history(row, col) {
    return row.history
      .filter(event => !!event.term)
      .map(event => {
        return event.term
      })
      .join(mandarinComma)
  },
  committee_category(row, col) {
    let value = row[col.property]
    return directories.committee_category.options
      .filter(option => option.value === value)
      .pop()
      .label
  }
}
