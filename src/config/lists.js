import uuid from 'uuid/v4'
import formatter from '@/config/formatters'
import { columnWidth } from '@/util/element'

function stringCompare (haystack, needle) {
  return haystack.indexOf(needle) > -1
}

function idPropCompare (haystack, needle) {
  return haystack.id === needle
}

function idFromList (haystack, needle) {
  return haystack.filter(item => item.id === needle).length > 0
}

export default {
  terms: {
    filters: [],
    key: 'index',
    paged: false,
    columns: [
      {
        prop: 'index',
        label: '屆期',
        width: columnWidth(2)
      },
      {
        prop: 'start_date',
        label: '起',
        width: columnWidth(5),
        formatter: formatter.date
      },
      {
        prop: 'end_date',
        label: '訖',
        width: columnWidth(5),
        formatter: formatter.date
      },
      {
        prop: 'sessions',
        label: '會期',
        formatter: formatter.sessions
      },
      {
        prop: 'parties',
        label: '政黨',
        formatter: formatter.list_abbreviations
      },
      {
        prop: 'caucuses',
        label: '黨團或政團',
        formatter: formatter.list_abbreviations
      }
    ]
  },
  committees: {
    filters: [],
    key: 'name',
    paged: false,
    columns: [
      {
        prop: 'name',
        label: '全名'
      },
      {
        prop: 'abbreviation',
        label: '短名'
      },
      {
        prop: 'category',
        label: '分類',
        formatter: formatter.committee_category
      }
    ]
  },
  reps: {
    filters: [
      {
        id: 'name',
        uniqueID: uuid(),
        customLabel: '全名',
        mapToColumn: 'name',
        compare: stringCompare
      },
      {
        id: 'term',
        uniqueID: uuid(),
        mapToColumn: 'history',
        compare: stringCompare
      },
      {
        id: 'district',
        uniqueID: uuid(),
        mapToColumn: 'history',
        compare: stringCompare
      },
      {
        id: 'party',
        uniqueID: uuid(),
        mapToColumn: 'history',
        compare: stringCompare
      }
    ],
    paged: true,
    columns: [
      {
        prop: 'name',
        label: '全名',
        width: columnWidth(10)
      },
      {
        prop: 'history',
        label: '任職歷史',
        formatter: formatter.rep_history
      }
    ]
  },
  parties: {
    filters: [
      {
        id: 'name',
        uniqueID: uuid(),
        customLabel: '全名',
        mapToColumn: 'name',
        compare: stringCompare
      }
    ],
    paged: false,
    columns: [
      {
        prop: 'name',
        label: '全名'
      },
      {
        prop: 'abbreviation',
        label: '短名'
      },
      {
        prop: 'emblem',
        label: '代表徽章'
      },
      {
        prop: 'color',
        label: '代表色'
      }
    ]
  },
  caucuses: {
    filters: [
      {
        id: 'name',
        uniqueID: uuid(),
        customLabel: '全名',
        mapToColumn: 'name',
        compare: stringCompare
      }
    ],
    paged: false,
    columns: [
      {
        prop: 'name',
        label: '全名'
      },
      {
        prop: 'abbreviation',
        label: '短名'
      },
      {
        prop: 'emblem',
        label: '代表徽章'
      },
      {
        prop: 'color',
        label: '代表色'
      }
    ]
  },
  general_topics: {
    filters: [
      {
        id: 'name',
        uniqueID: uuid(),
        customLabel: '標題',
        mapToColumn: 'title',
        compare: stringCompare
      }
    ],
    columns: [
      {
        prop: 'title',
        label: '標題'
      },
      {
        prop: 'index',
        label: '排序',
        width: columnWidth(2)
      },
      {
        prop: 'image',
        label: '圖像'
      },
      {
        prop: 'specific_topics',
        label: '關聯小議題',
        formatter: formatter.list_titles
      }
    ]
  },
  specific_topics: {
    filters: [
      {
        id: 'name',
        uniqueID: uuid(),
        customLabel: '標題',
        mapToColumn: 'title',
        compare: stringCompare
      },
      {
        id: 'general_topic',
        uniqueID: uuid(),
        customLabel: '關聯大議題',
        mapToColumn: 'general_topic',
        compare: stringCompare
      }
    ],
    columns: [
      {
        prop: 'title',
        label: '標題'
      },
      {
        prop: 'index',
        label: '排序',
        width: columnWidth(2)
      },
      {
        prop: 'image',
        label: '圖像'
      },
      {
        prop: 'general_topic',
        label: '關聯大議題',
        formatter: formatter.list_titles
      },
      {
        prop: 'act_dirs',
        label: '修法方向',
        formatter: formatter.list_names
      },
      {
        prop: 'st_questions',
        label: '爭點',
        formatter: formatter.list_questions
      }
    ]
  },
  acts: {
    filters: [
      {
        id: 'name',
        uniqueID: uuid(),
        customLabel: '標題',
        mapToColumn: 'title',
        compare: stringCompare
      },
      {
        id: 'specific_topic',
        uniqueID: uuid(),
        customLabel: '關聯小議題',
        mapToColumn: 'specific_topics',
        compare: idFromList
      }
    ],
    columns: [
      {
        prop: 'title',
        label: '標題'
      },
      {
        prop: 'official_seq_no',
        label: '院總字號'
      },
      {
        prop: 'specific_topics',
        label: '關聯小議題',
        formatter: formatter.list_titles
      }
    ]
  },
  act_features: {
    filters: [
      {
        id: 'specific_topic',
        uniqueID: uuid(),
        customLabel: '關聯小議題',
        mapToColumn: 'specific_topic',
        compare: idPropCompare
      },
      {
        id: 'act',
        uniqueID: uuid(),
        customLabel: '關聯法案',
        mapToColumn: 'act',
        compare: idPropCompare
      },
      {
        id: 'act_dir',
        uniqueID: uuid(),
        customLabel: '關聯修法方向',
        mapToColumn: 'act_dir',
        compare: idPropCompare
      }
    ],
    columns: [
      {
        prop: 'specific_topic',
        label: '關聯小議題',
        formatter: formatter.title
      },
      {
        prop: 'act',
        label: '關聯法案',
        formatter: formatter.title
      },
      {
        prop: 'act_dir',
        label: '關聯修法方向',
        formatter: formatter.name
      },
      {
        prop: 'feature',
        label: '法案比較'
      },
      {
        prop: 'dir',
        label: '法案比較價值判斷'
      }
    ]
  },
  rs_statements: {
    filters: [
      {
        id: 'specific_topic',
        uniqueID: uuid(),
        customLabel: '關聯小議題',
        mapToColumn: 'st_id'
      },
      {
        id: 'term',
        uniqueID: uuid(),
        mapToColumn: 'term_index'
      },
      {
        id: 'rep',
        uniqueID: uuid(),
        mapToColumn: 'rep_id'
      },
      {
        id: 'party',
        uniqueID: uuid(),
        mapToColumn: 'rep_party_id'
      },
      {
        id: 'rs_position',
        uniqueID: uuid(),
        mapToColumn: 'position'
      }
    ],
    columns: [
      {
        prop: 'specific_topic',
        label: '關聯小議題',
        formatter: formatter.title
      },
      {
        prop: 'term_index',
        label: '屆期',
        width: columnWidth(2)
      },
      {
        prop: 'rep_id',
        label: '立法委員'
      },
      {
        prop: 'rep_party_id',
        label: '政黨'
      },
      {
        prop: 'content',
        label: '內容'
      },
      {
        prop: 'position',
        label: '立場'
      },
      {
        prop: 'position_summary',
        label: '立場摘要'
      }
    ]
  },
  rs_bills: {
    filters: [
      {
        id: 'specific_topic',
        uniqueID: uuid(),
        customLabel: '關聯小議題',
        mapToColumn: 'specific_topics'
      },
      {
        id: 'act',
        uniqueID: uuid(),
        customLabel: '關聯法案',
        mapToColumn: 'act_id'
      },
      {
        id: 'term',
        uniqueID: uuid(),
        mapToColumn: 'term_index'
      },
      {
        id: 'principle_sponsor_type',
        uniqueID: uuid(),
        cascadeUpdate: 'principle_sponsor',
        mapToColumn: 'principle_sponsor_type'
      },
      {
        id: 'principle_sponsor',
        uniqueID: uuid(),
        mapToColumn: 'principle_sponsor_value'
      },
      {
        id: 'party',
        uniqueID: uuid(),
        customLabel: '第一提案者政黨',
        mapToColumn: 'principle_sponsor_party',
        compare: idFromList
      }
    ],
    columns: [
      {
        prop: 'specific_topics',
        label: '關聯小議題'
      },
      {
        prop: 'act_id',
        label: '關聯法案'
      },
      {
        prop: 'term_index',
        label: '屆期',
        width: columnWidth(2)
      },
      {
        prop: 'principle_sponsor_type',
        label: '第一提案者類別'
      },
      {
        prop: 'principle_sponsor_value',
        label: '第一提案者'
      },
      {
        prop: 'principle_sponsor_parties',
        label: '第一提案者政黨'
      },
      {
        prop: 'content',
        label: '內容'
      }
    ]
  },
  rs_votes: {
    filters: [
      {
        id: 'specific_topic',
        uniqueID: uuid(),
        customLabel: '關聯小議題',
        mapToColumn: 'st_id'
      },
      {
        id: 'term',
        uniqueID: uuid(),
        mapToColumn: 'term_index'
      }
    ],
    columns: [
      {
        prop: 'st_id',
        label: '關聯小議題'
      },
      {
        prop: 'term_index',
        label: '屆期',
        width: columnWidth(2)
      },
      {
        prop: 'title',
        label: '標題'
      },
      {
        prop: 'aye_count',
        label: '贊成人數'
      },
      {
        prop: 'nay_count',
        label: '反對人數'
      },
      {
        prop: 'abstain_count',
        label: '棄權人數'
      },
      {
        prop: 'absence_count',
        label: '缺席人數'
      },
      {
        prop: 'g0v_link',
        label: 'g0v'
      },
      {
        prop: 'source_link',
        label: '原始資料'
      }
    ]
  }
}
