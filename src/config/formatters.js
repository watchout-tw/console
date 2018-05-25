import directories from './directories'
import options from './options'
import marked from 'marked'
import * as util from '@/util'

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

function array2Text (text) {
  return Array.isArray(text) ? text.join('\n') : text
}

export default {
  date(row, col) {
    if (!row[col.property]) return ''
    if (typeof row[col.property] === 'string' && row[col.property].match(util.mysqlTimestampRex)) {
      return util.mysqlTimestamp2DateObj(row[col.property]).toLocaleDateString('zh-Hans-TW')
    } else {
      return new Date(row[col.property]).toLocaleDateString('zh-Hans-TW')
    }
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
  version_no(row, col) {
    return row[col.property] ? row[col.property].version_no : ''
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
    return row[col.property] ? '<span class="yes">Yes</span>' : '<span class="null">No</span>'
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
  },
  bullet_point_figures(row, col) {
    let figures = row[col.property]
    return '<ul>' + figures.map(figure => `<li>${figure.title}</li>`).join('') + '</ul>'
  },
  markdown(row, col) {
    return marked(row[col.property])
  },
  longtext(str) {
    return array2Text(str)
  },
  figure_type(row, col) {
    let type = row[col.property]
    return options.figure_type[type] ? options.figure_type[type].label : row[col.property]
  },
  composition_status(row, col) {
    let status = row[col.property]
    return options.composition_status[status] ? options.composition_status[status].label : row[col.property]
  },
  figure_data_set_st(row, col) {
    return row.data_set.st ? row.data_set.st.title : ''
  },
  figure_data_set_type(row, col) {
    let type = row[col.property]
    return options.figure_data_set_type[type] ? options.figure_data_set_type[type].label : row[col.property]
  },
  timeline_type(row, col) {
    let type = row[col.property]
    return options.timeline_type[type] ? options.timeline_type[type].label : row[col.property]
  },
  timeline_event_type(row, col) {
    let type = row[col.property]
    return options.timeline_event_type[type] ? options.timeline_event_type[type].label : row[col.property]
  },
  ask_question_game(row, col) {
    let game = row[col.property]
    return game.title ? game.title : ''
  },
  ask_question_persona(row, col) {
    let persona = row[col.property]
    return persona.name ? persona.name : '無顯示名稱'
  },
  ask_answer_game(row, col) {
    let question = row[col.property]
    return question.game.title ? question.game.title : ''
  },
  ask_answer_question(row, col) {
    let question = row[col.property]
    return question.title ? question.title : ''
  },
  ask_answer_persona(row, col) {
    let persona = row[col.property]
    return persona.name ? persona.name : ''
  }
}
