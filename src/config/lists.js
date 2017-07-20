import uuid from 'uuid/v4'
import formatters from '@/config/formatters'
import comparators from '@/config/comparators'
import { columnWidth } from '@/util/element'

/**
編輯器設定檔

- 每個 column 的 prop 要跟 API return object 的欄位名稱相符
- 加入 formatter 指定如何將該 col 的值 format 成純文字

*/

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
        formatter: formatters.date
      },
      {
        prop: 'end_date',
        label: '訖',
        width: columnWidth(5),
        formatter: formatters.date
      },
      {
        prop: 'sessions',
        label: '會期',
        formatter: formatters.sessions
      },
      {
        prop: 'parties',
        label: '政黨',
        formatter: formatters.list_abbreviations
      },
      {
        prop: 'caucuses',
        label: '黨團或政團',
        formatter: formatters.list_abbreviations
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
        formatter: formatters.committee_category
      }
    ]
  },
  reps: {
    filters: [
      {
        id: 'name',
        uniqueID: uuid(),
        label: '全名',
        type: 'input',
        mapToColumn: 'name',
        comparator: comparators.string
      },
      {
        id: 'term',
        uniqueID: uuid(),
        directory: 'term',
        label: '屆期',
        type: 'select',
        mapToColumn: 'history'
      },
      {
        id: 'district',
        uniqueID: uuid(),
        directory: 'district',
        label: '選區',
        type: 'select',
        feature: {
          grouped: true
        },
        mapToColumn: 'history'
      },
      {
        id: 'party',
        uniqueID: uuid(),
        directory: 'party',
        label: '政黨',
        type: 'select',
        mapToColumn: 'history'
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
        formatter: formatters.rep_history
      }
    ]
  },
  parties: {
    filters: [
      {
        id: 'name',
        uniqueID: uuid(),
        label: '全名',
        type: 'input',
        mapToColumn: 'name',
        comparator: comparators.string
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
        label: '全名',
        type: 'input',
        mapToColumn: 'name',
        comparator: comparators.string
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
        id: 'title',
        uniqueID: uuid(),
        label: '標題',
        type: 'input',
        mapToColumn: 'title',
        comparator: comparators.string
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
        formatter: formatters.list_titles
      }
    ]
  },
  specific_topics: {
    filters: [
      {
        id: 'title',
        uniqueID: uuid(),
        label: '標題',
        type: 'input',
        mapToColumn: 'title',
        comparator: comparators.string
      },
      {
        id: 'general_topic',
        uniqueID: uuid(),
        directory: 'general_topic',
        label: '關聯大議題',
        type: 'select',
        mapToColumn: 'general_topics',
        comparator: comparators.idFromList
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
        formatter: formatters.list_titles
      },
      {
        prop: 'act_dirs',
        label: '修法方向',
        formatter: formatters.list_names
      },
      {
        prop: 'st_questions',
        label: '爭點',
        formatter: formatters.list_questions
      }
    ]
  },
  acts: {
    filters: [
      {
        id: 'title',
        uniqueID: uuid(),
        label: '標題',
        type: 'input',
        mapToColumn: 'title',
        comparator: comparators.string
      },
      {
        id: 'specific_topic',
        uniqueID: uuid(),
        directory: 'specific_topic',
        label: '關聯小議題',
        type: 'select',
        mapToColumn: 'specific_topics',
        comparator: comparators.idFromList
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
        formatter: formatters.list_titles
      }
    ]
  },
  act_features: {
    filters: [
      {
        id: 'specific_topic',
        uniqueID: uuid(),
        directory: 'specific_topic',
        label: '關聯小議題',
        type: 'select',
        mapToColumn: 'specific_topic',
        comparator: comparators.id
      },
      {
        id: 'act',
        uniqueID: uuid(),
        directory: 'act',
        label: '關聯法案',
        type: 'select',
        mapToColumn: 'act',
        comparator: comparators.id
      },
      {
        id: 'act_dir',
        uniqueID: uuid(),
        directory: 'act_dir',
        label: '關聯修法方向',
        type: 'select',
        mapToColumn: 'act_dir',
        comparator: comparators.id
      }
    ],
    columns: [
      {
        prop: 'st',
        label: '關聯小議題',
        formatter: formatters.title
      },
      {
        prop: 'act',
        label: '關聯法案',
        formatter: formatters.title
      },
      {
        prop: 'act_dir',
        label: '關聯修法方向',
        formatter: formatters.name
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
        directory: 'specific_topic',
        label: '關聯小議題',
        type: 'select',
        mapToColumn: 'st'
      },
      {
        id: 'term',
        uniqueID: uuid(),
        directory: 'term',
        label: '屆期',
        type: 'select',
        mapToColumn: 'term_index'
      },
      {
        id: 'rep',
        uniqueID: uuid(),
        directory: 'rep',
        label: '立法委員',
        type: 'select',
        mapToColumn: 'rep'
      },
      {
        id: 'party',
        uniqueID: uuid(),
        directory: 'party',
        label: '政黨',
        type: 'select',
        mapToColumn: 'rep_party'
      },
      {
        id: 'rs_position',
        uniqueID: uuid(),
        directory: 'rs_position',
        label: '立場',
        type: 'select',
        mapToColumn: 'position'
      }
    ],
    columns: [
      {
        prop: 'st',
        label: '關聯小議題',
        formatter: formatters.title
      },
      {
        prop: 'term_index',
        label: '屆期',
        width: columnWidth(2)
      },
      {
        prop: 'rep',
        label: '立法委員'
      },
      {
        prop: 'rep_party',
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
        directory: 'specific_topic',
        label: '關聯小議題',
        type: 'select',
        mapToColumn: 'specific_topics',
        comparator: comparators.idFromList
      },
      {
        id: 'act',
        uniqueID: uuid(),
        directory: 'act',
        label: '關聯法案',
        type: 'select',
        mapToColumn: 'act',
        comparator: comparators.id
      },
      {
        id: 'term',
        uniqueID: uuid(),
        directory: 'term',
        label: '屆期',
        type: 'select',
        mapToColumn: 'term_index',
        comparator: comparators.equal
      },
      {
        id: 'principle_sponsor_type',
        uniqueID: uuid(),
        directory: 'principle_sponsor_type',
        label: '第一提案者類別',
        type: 'select',
        cascadeUpdate: ['principle_sponsor'],
        mapToColumn: 'principle_sponsor_type',
        comparator: comparators.equal
      },
      {
        id: 'principle_sponsor',
        uniqueID: uuid(),
        directory: 'principle_sponsor',
        label: '第一提案者',
        type: 'select',
        mapToColumn: 'principle_sponsor_value',
        comparator: comparators.id
      },
      {
        id: 'party',
        uniqueID: uuid(),
        directory: 'party',
        label: '第一提案者政黨',
        type: 'select',
        mapToColumn: 'principle_sponsor_parties',
        comparator: comparators.idFromList
      }
    ],
    columns: [
      {
        prop: 'specific_topics',
        label: '關聯小議題',
        formatter: formatters.list_titles
      },
      {
        prop: 'act',
        label: '關聯法案',
        formatter: formatters.title
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
        label: '第一提案者',
        formatter: formatters.name
      },
      {
        prop: 'principle_sponsor_parties',
        label: '第一提案者政黨',
        formatter: formatters.list_names
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
        directory: 'specific_topic',
        label: '關聯小議題',
        type: 'select',
        mapToColumn: 'st',
        comparator: comparators.id
      },
      {
        id: 'term',
        uniqueID: uuid(),
        directory: 'term',
        label: '屆期',
        type: 'select',
        mapToColumn: 'term_index',
        comparator: comparators.equal
      }
    ],
    columns: [
      {
        prop: 'st',
        label: '關聯小議題',
        formatter: formatters.title
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
