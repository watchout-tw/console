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

function partyFlag(hex) {
  if(!hex) {
    hex = '#000'
  }
  return `<div class="party-flag" style="background-color: ${hex}"></div>`
}

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
    return row[col.property] ? row[col.property].title : ''
  },
  name(row, col) {
    return row[col.property] ? row[col.property].name : ''
  },
  abbreviation(row, col) {
    return row[col.property] ? row[col.property].abbreviation : ''
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
  },
  boolean(row, col) {
    return row[col.property] ? '⚫️' : '⚪️'
  },
  party_flag(row, col) {
    let color = row[col.property]
    return partyFlag(color)
  },
  party_flag_from_color(row, col) {
    let color = row[col.property].color
    return partyFlag(color)
  },
  party_flags(row, col) {
    let parties = row[col.property]
    return'<div class="flags d-flex flex-wrap">' + parties.map(party => partyFlag(party.color)).join('') + '</div>'
  },
  link(row, col) {
    let url = row[col.property]
    return `<a class="link" href="${url}" target="_blank">🔗</a>`
  },
  bullet_point_questions(row, col) {
    let questions = row[col.property]
    return '<ul>' + questions.map(questionObj => `<li>${questionObj.question}</li>`).join('') + '</ul>'
  }
}
