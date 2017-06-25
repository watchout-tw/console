const mandarinComma = '、'
let arrayJoinAtIndex = (array, index, separator = mandarinComma) => {
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
  parties(row, col) {
    return arrayJoinAtIndex(row.parties, 'abbreviation')
  },
  caucuses(row, col) {
    return arrayJoinAtIndex(row.caucuses, 'abbreviation')
  },
  repHistory(row, col) {
    return row.history.map((event) => {
      return JSON.stringify(event)
    }).join(',')
  }
}
