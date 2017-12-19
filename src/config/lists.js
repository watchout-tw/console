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
    api: '/console/lab/terms',
    paged: false,
    filters: [],
    key: 'index',
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
    api: '/console/lab/committees',
    paged: false,
    filters: [],
    key: 'name',
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
    api: '/console/lab/reps',
    paged: true,
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
    api: '/console/lab/parties',
    paged: false,
    filters: [
      {
        id: 'name',
        label: '全名',
        type: 'input',
        mapToColumn: 'name',
        comparator: comparators.string
      }
    ],
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
    api: '/console/lab/caucuses',
    paged: false,
    filters: [
      {
        id: 'name',
        label: '全名',
        type: 'input',
        mapToColumn: 'name',
        comparator: comparators.string
      }
    ],
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
    api: '/console/lab/general_topics',
    paged: false,
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
    api: '/console/lab/specific_topics',
    paged: false,
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
    api: '/console/lab/acts',
    paged: false,
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
    api: '/console/lab/act_features',
    paged: false,
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
    api: '/console/lab/rs_statements',
    paged: true,
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
    api: '/console/lab/rs_bills',
    paged: true,
    filters: [
      {
        id: 'st',
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
        width: columnWidth(3),
        formatter: formatters.boolean
      },
      {
        prop: 'version_no',
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
    api: '/console/lab/rs_votes',
    paged: true,
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
        width: columnWidth(3)
      },
      {
        prop: 'nay_count',
        label: '反對',
        width: columnWidth(3)
      },
      {
        prop: 'abstain_count',
        label: '棄權',
        width: columnWidth(3)
      },
      {
        prop: 'absence_count',
        label: '缺席',
        width: columnWidth(3)
      },
      {
        prop: 'g0v_link',
        label: 'g0v',
        formatter: formatters.link,
        width: columnWidth(3)
      },
      {
        prop: 'source_link',
        label: '原始資料',
        formatter: formatters.link,
        width: columnWidth(4)
      }
    ]
  },
  timeline_events: {
    api: '/console/comp/timeline_events',
    paged: true,
    filters: [
      {
        id: 'date',
        label: '日期',
        type: 'datepicker',
        mapToColumn: 'date'
      },
      {
        id: 'type',
        label: '類型',
        type: 'select',
        directory: 'timeline_event_type',
        mapToColumn: 'type'
      },
      {
        id: 'q',
        label: '關鍵字',
        type: 'input'
      }
    ],
    key: 'id',
    columns: [
      {
        prop: 'status',
        label: '狀態'
      },
      {
        prop: 'date',
        label: '日期',
        formatter: formatters.date
      },
      {
        prop: 'type',
        label: '類型'
      },
      {
        prop: 'tagline',
        label: '標語'
      },
      {
        prop: 'title',
        label: '標題'
      },
      {
        prop: 'content',
        label: '內容'
      }
    ]
  },
  timelines: {
    api: '/console/comp/timelines',
    paged: false,
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
    api: '/console/comp/figures',
    paged: false,
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
    columns: [
      {
        prop: 'status',
        label: '狀態',
        formatter: formatters.composition_status
      },
      {
        prop: 'type',
        label: '類型',
        formatter: formatters.figure_type
      },
      {
        prop: 'title',
        label: '標題'
      }
    ]
  },
  docs: {
    api: '/console/lab/docs',
    paged: false,
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
    api: '/console/lab/topic_overviews',
    paged: false,
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
        id: 'title',
        label: '標題',
        type: 'input',
        mapToColumn: 'title',
        comparator: comparators.string
      }
    ],
    key: 'id',
    columns: [
      {
        prop: 'status',
        label: '狀態'
      },
      {
        prop: 'st',
        label: '關聯小議題',
        formatter: formatters.title
      },
      {
        prop: 'tagline',
        label: '標語'
      },
      {
        prop: 'title',
        label: '標題'
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
    api: '/console/lab/bill_data_sets',
    paged: false,
    filters: [
      {
        id: 'name',
        label: '名稱',
        type: 'input',
        mapToColumn: 'name',
        comparator: comparators.string
      },
      {
        id: 'term',
        directory: 'term',
        label: '屆期',
        type: 'select',
        mapToColumn: 'term_index'
      },
      {
        id: 'specific_topic',
        directory: 'specific_topic',
        label: '關聯小議題',
        type: 'select',
        mapToColumn: 'st',
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
    key: 'id',
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
        prop: 'term_index',
        label: '屆期'
      },
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
      }
    ]
  },
  lab_statement_data_sets: {
    api: '/console/lab/statement_data_sets',
    paged: false,
    filters: [
      {
        id: 'name',
        label: '名稱',
        type: 'input',
        mapToColumn: 'name',
        comparator: comparators.string
      },
      {
        id: 'term',
        directory: 'term',
        label: '屆期',
        type: 'select',
        mapToColumn: 'term_index'
      },
      {
        id: 'specific_topic',
        directory: 'specific_topic',
        label: '關聯小議題',
        type: 'select',
        mapToColumn: 'st',
        comparator: comparators.id
      },
      {
        id: 'st_question',
        directory: 'st_question',
        label: '爭點',
        type: 'select',
        mapToColumn: 'st_question',
        comparator: comparators.id
      }
    ],
    key: 'id',
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
        prop: 'term_index',
        label: '屆期'
      },
      {
        prop: 'st',
        label: '關聯小議題',
        formatter: formatters.title
      },
      {
        prop: 'st_question',
        label: '爭點',
        formatter: formatters.title
      }
    ]
  },
  lab_data_reports: {
    api: '/console/lab/data_reports',
    paged: false,
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
    columns: [
      {
        prop: 'status',
        label: '狀態',
        formatter: formatters.composition_status
      },
      {
        prop: 'title',
        label: '標題'
      },
      {
        prop: 'st',
        label: '關聯小議題',
        formatter: formatters.title
      },
      {
        prop: 'figure_data_set_type',
        label: '資料集類型'
      },
      {
        prop: 'figure_data_set',
        label: '資料集',
        formatter: formatters.name
      },
      {
        prop: 'figure_data_set',
        label: '資料集版本',
        formatter: formatters.version_no
      },
      {
        prop: 'figures',
        label: '圖表',
        formatter: formatters.bullet_point_figures
      }
    ]
  },
  lab_insights: {
    api: '/console/lab/insights',
    paged: false,
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
    columns: [
      {
        prop: 'status',
        label: '狀態'
      },
      {
        prop: 'title',
        label: '標題'
      },
      {
        prop: 'st',
        label: '關聯小議題'
      }
    ]
  }
}
