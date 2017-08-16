import formatters from '@/config/formatters'
import comparators from '@/config/comparators'
import { columnWidth } from '@/util/element'
import cascade from '@/util/cascade'

/**
編輯器設定檔

- 每個 column 的 prop 要跟 API return object 的欄位名稱相符
- 加入 formatter 指定如何將該 col 的值 format 成純文字

*/

let singleTopicColumnWidth = columnWidth(6)

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
        formatter: formatters.party_flags
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
        label: '全名',
        type: 'input',
        mapToColumn: 'name',
        comparator: comparators.string
      },
      {
        id: 'term',
        directory: 'term',
        label: '屆期',
        type: 'select',
        mapToColumn: 'history'
      },
      {
        id: 'district',
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
        label: '代表色',
        formatter: formatters.party_flag
      }
    ]
  },
  caucuses: {
    filters: [
      {
        id: 'name',
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
        label: '標題',
        type: 'input',
        mapToColumn: 'title',
        comparator: comparators.string
      }
    ],
    columns: [
      {
        prop: 'title',
        label: '標題',
        width: singleTopicColumnWidth
      },
      {
        prop: 'index',
        label: '排序',
        width: columnWidth(2)
      },
      {
        prop: 'image',
        label: '圖像',
        width: columnWidth(3)
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
        label: '標題',
        type: 'input',
        mapToColumn: 'title',
        comparator: comparators.string
      },
      {
        id: 'general_topic',
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
        label: '標題',
        width: singleTopicColumnWidth
      },
      {
        prop: 'index',
        label: '排序',
        width: columnWidth(2)
      },
      {
        prop: 'image',
        label: '圖像',
        width: columnWidth(3)
      },
      {
        prop: 'general_topics',
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
        formatter: formatters.bullet_point_questions
      }
    ]
  },
  acts: {
    filters: [
      {
        id: 'title',
        label: '標題',
        type: 'input',
        mapToColumn: 'title',
        comparator: comparators.string
      },
      {
        id: 'specific_topic',
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
        directory: 'specific_topic',
        label: '關聯小議題',
        type: 'select',
        mapToColumn: 'specific_topic',
        comparator: comparators.id
      },
      {
        id: 'act',
        directory: 'act',
        label: '關聯法案',
        type: 'select',
        mapToColumn: 'act',
        comparator: comparators.id
      },
      {
        id: 'act_dir',
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
        formatter: formatters.title,
        width: singleTopicColumnWidth
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
        directory: 'specific_topic',
        label: '關聯小議題',
        type: 'select',
        mapToColumn: 'st',
        comparator: comparators.id
      },
      {
        id: 'term',
        directory: 'term',
        label: '屆期',
        type: 'select',
        mapToColumn: 'term_index',
        comparator: comparators.equal
      },
      {
        id: 'rep',
        directory: 'rep',
        label: '立法委員',
        type: 'select',
        mapToColumn: 'rep',
        comparator: comparators.id
      },
      {
        id: 'party',
        directory: 'party',
        label: '政黨',
        type: 'select',
        mapToColumn: 'rep_party',
        comparator: comparators.id
      },
      {
        id: 'rs_position',
        directory: 'rs_position',
        label: '立場',
        type: 'select',
        mapToColumn: 'position',
        comparator: comparators.equal
      }
    ],
    columns: [
      {
        prop: 'st',
        label: '關聯小議題',
        formatter: formatters.title,
        width: singleTopicColumnWidth
      },
      {
        prop: 'term_index',
        label: '屆期',
        width: columnWidth(2)
      },
      {
        prop: 'rep',
        label: '立法委員',
        formatter: formatters.name
      },
      {
        prop: 'rep_party',
        label: '政黨',
        formatter: formatters.party_flag_from_color,
        width: columnWidth(2)
      },
      {
        prop: 'content',
        label: '內容'
      },
      {
        prop: 'position',
        label: '立場',
        directory: 'rs_position',
        width: columnWidth(2)
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
        directory: 'specific_topic',
        label: '關聯小議題',
        type: 'select',
        mapToColumn: 'specific_topics',
        comparator: comparators.idFromList
      },
      {
        id: 'act',
        directory: 'act',
        label: '關聯法案',
        type: 'select',
        mapToColumn: 'act',
        comparator: comparators.id
      },
      {
        id: 'term',
        directory: 'term',
        label: '屆期',
        type: 'select',
        mapToColumn: 'term_index',
        comparator: comparators.equal
      },
      {
        id: 'principle_sponsor_type',
        directory: 'principle_sponsor_type',
        label: '第一提案者類別',
        type: 'select',
        mapToColumn: 'principle_sponsor_type',
        comparator: comparators.equal,
        cascadeUpdate: [
          cascade.appointDirectory(['principle_sponsor'])
        ]
      },
      {
        id: 'principle_sponsor',
        label: '第一提案者',
        type: 'select',
        mapToColumn: 'principle_sponsor_value',
        comparator: comparators.id
      },
      {
        id: 'party',
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
        prop: 'is_law',
        label: '法律？',
        width: columnWidth(3)
      },
      {
        prop: 'law_version_no',
        label: '版本'
      },
      {
        prop: 'term_index',
        label: '屆期',
        width: columnWidth(2)
      },
      {
        prop: 'principle_sponsor_type',
        label: '第一提案者類別',
        directory: 'principle_sponsor_type'
      },
      {
        prop: 'principle_sponsor_value',
        label: '第一提案者',
        formatter: formatters.name
      },
      {
        prop: 'principle_sponsor_parties',
        label: '第一提案者政黨',
        formatter: formatters.party_flags
      }
    ]
  },
  rs_votes: {
    filters: [
      {
        id: 'specific_topic',
        directory: 'specific_topic',
        label: '關聯小議題',
        type: 'select',
        mapToColumn: 'st',
        comparator: comparators.id
      },
      {
        id: 'term',
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
        formatter: formatters.title,
        width: singleTopicColumnWidth
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
        label: '贊成',
        width: columnWidth(2)
      },
      {
        prop: 'nay_count',
        label: '反對',
        width: columnWidth(2)
      },
      {
        prop: 'abstain_count',
        label: '棄權',
        width: columnWidth(2)
      },
      {
        prop: 'absence_count',
        label: '缺席',
        width: columnWidth(2)
      },
      {
        prop: 'g0v_link',
        label: 'g0v',
        formatter: formatters.link,
        width: columnWidth(2)
      },
      {
        prop: 'source_link',
        label: '原始資料',
        formatter: formatters.link,
        width: columnWidth(4)
      }
    ]
  },
  timelines: {
    filters: [
      {
        id: 'title',
        label: '標題',
        type: 'input',
        mapToColumn: 'title',
        comparator: comparators.string
      }
    ],
    key: 'id',
    paged: false,
    columns: [
      {
        prop: 'status',
        label: '狀態'
      },
      {
        prop: 'type',
        label: '類型'
      },
      {
        prop: 'title',
        label: '標題'
      }
    ]
  },
  figures: {
    filters: [
      {
        id: 'title',
        label: '標題',
        type: 'input',
        mapToColumn: 'title',
        comparator: comparators.string
      }
    ],
    key: 'id',
    paged: false,
    columns: [
      {
        prop: 'status',
        label: '狀態'
      },
      {
        prop: 'type',
        label: '類型'
      },
      {
        prop: 'title',
        label: '標題'
      }
    ]
  },
  docs: {
    filters: [
      {
        id: 'title',
        label: '標題',
        type: 'input',
        mapToColumn: 'title',
        comparator: comparators.string
      }
    ],
    key: 'id',
    paged: false,
    columns: [
      {
        prop: 'status',
        label: '狀態'
      },
      {
        prop: 'type',
        label: '類型'
      },
      {
        prop: 'title',
        label: '標題'
      }
    ]
  },
  lab_topic_overviews: {
    filters: [
      {
        id: 'specific_topic',
        directory: 'specific_topic',
        label: '關聯小議題',
        type: 'select',
        mapToColumn: 'st',
        comparator: comparators.id
      }
    ],
    key: 'id',
    paged: false,
    columns: [
      {
        prop: 'st',
        label: '關聯小議題'
      },
      {
        prop: 'intro',
        label: '簡介'
      },
      {
        prop: 'description',
        label: '敘述'
      }
    ]
  },
  lab_bill_data_sets: {
    filters: [
      {
        id: 'specific_topic',
        directory: 'specific_topic',
        label: '關聯小議題',
        type: 'select',
        mapToColumn: 'st',
        comparator: comparators.id
      }
    ],
    key: 'id',
    paged: false,
    columns: [
      {
        prop: 'name',
        label: '名稱'
      },
      {
        prop: 'version_no',
        label: '版本號'
      },
      {
        prop: 'st',
        label: '關聯小議題'
      }
    ]
  },
  lab_statement_data_sets: {
    filters: [
      {
        id: 'specific_topic',
        directory: 'specific_topic',
        label: '關聯小議題',
        type: 'select',
        mapToColumn: 'st',
        comparator: comparators.id
      }
    ],
    key: 'id',
    paged: false,
    columns: [
      {
        prop: 'name',
        label: '名稱'
      },
      {
        prop: 'version_no',
        label: '版本號'
      },
      {
        prop: 'st',
        label: '關聯小議題'
      }
    ]
  },
  lab_data_reports: {
    filters: [
      {
        id: 'specific_topic',
        directory: 'specific_topic',
        label: '關聯小議題',
        type: 'select',
        mapToColumn: 'st',
        comparator: comparators.id
      }
    ],
    key: 'id',
    paged: false,
    columns: [
      {
        prop: 'st',
        label: '關聯小議題'
      },
      {
        prop: 'data_set',
        label: '資料源'
      },
      {
        prop: 'figures',
        label: '圖表清單'
      }
    ]
  }
}
