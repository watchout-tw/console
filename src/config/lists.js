import formatter from '@/config/formatters'
import { columnWidth } from '@/util/element'

function stringComare (haystack, needle) {
  return haystack.indexOf(needle) > -1
}

function idPropCompare (haystack, needle) {
  return haystack.id === needle
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
    filters: [
      {
        id: 'name',
        mapToColumn: 'name',
        compare: stringComare
      }
    ],
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
        mapToColumn: 'name',
        compare: stringComare
      },
      {
        id: 'term',
        mapToColumn: 'history',
        compare: stringComare
      },
      {
        id: 'party',
        mapToColumn: 'history',
        compare: stringComare
      },
      {
        id: 'district',
        mapToColumn: 'history',
        compare: stringComare
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
  districts: {
    filters: [
      {
        id: 'name',
        mapToColumn: 'name',
        compare: stringComare
      },
      {
        id: 'zone',
        mapToColumn: 'zone_name',
        compare: stringComare
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
        prop: 'zone_name',
        label: '區域'
      },
      {
        prop: 'index',
        label: '編號',
        width: columnWidth(2)
      },
      {
        prop: 'neighborhoods',
        label: '選區內行政區'
      }
    ]
  },
  parties: {
    filters: [
      {
        id: 'name',
        mapToColumn: 'name',
        compare: stringComare
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
        mapToColumn: 'name',
        compare: stringComare
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
        mapToColumn: 'title',
        compare: stringComare
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
        mapToColumn: 'title',
        compare: stringComare
      },
      {
        id: 'general_topic',
        mapToColumn: 'general_topic',
        compare: stringComare
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
        prop: 'general_topics',
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
        mapToColumn: 'title',
        compare: stringComare
      },
      {
        id: 'specific_topic',
        mapToColumn: 'specifi_topics',
        compare: stringComare
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
        mapToColumn: 'specific_topic',
        compare: idPropCompare
      },
      {
        id: 'act',
        mapToColumn: 'act'
      },
      {
        id: 'act_dir',
        mapToColumn: 'act_dir'
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
  statements: {
    filters: [
      {
        id: 'specific_topic',
        mapToColumn: 'st_title'
      },
      {
        id: 'term',
        mapToColumn: 'term_index'
      },
      {
        id: 'rep',
        mapToColumn: 'rep_name'
      },
      {
        id: 'party',
        mapToColumn: 'party_name'
      }
    ],
    columns: [
      {
        prop: 'st_title',
        label: '關聯小議題'
      },
      {
        prop: 'term_index',
        label: '屆期',
        width: columnWidth(2)
      },
      {
        prop: 'rep_name',
        label: '立法委員'
      },
      {
        prop: 'party_name',
        label: '政黨'
      },
      {
        prop: 'summary',
        label: '摘要'
      },
      {
        prop: 'speech_content',
        label: '內容'
      }
    ]
  },
  sponsorships: {
    filters: [
      {
        id: 'specific_topic',
        mapToColumn: 'st_title'
      },
      {
        id: 'term',
        mapToColumn: 'term_index'
      },
      {
        id: 'act',
        mapToColumn: 'act'
      },
      {
        id: 'sponsor_type',
        mapToColumn: 'principle_sponsor_type'
      },
      {
        id: 'party',
        mapToColumn: 'principle_sponsor_party'
      },
      {
        id: 'sponsor',
        mapToColumn: 'principle_sponsor'
      }
    ],
    columns: [
      {
        prop: 'st_title',
        label: '關聯小議題'
      },
      {
        prop: 'term_index',
        label: '屆期',
        width: columnWidth(2)
      },
      {
        prop: 'principle_sponsor_type',
        label: '首位提案者類別'
      },
      {
        prop: 'principle_sponsor_party',
        label: '首位提案者政黨'
      },
      {
        prop: 'principle_sponsor',
        label: '首位提案者'
      },
      {
        prop: 'sponsors',
        label: '提案者'
      },
      {
        prop: 'cosponsors',
        label: '連署者'
      },
      {
        prop: 'propose_date',
        label: '日期'
      },
      {
        prop: 'speech_content',
        label: '內容'
      }
    ]
  },
  votes: {
    filters: [
      {
        id: 'specific_topic',
        mapToColumn: 'st_title'
      },
      {
        id: 'term',
        mapToColumn: 'term_index'
      },
      {
        id: 'name',
        mapToColumn: 'name'
      }
    ],
    columns: [
      {
        prop: 'st_title',
        label: '關聯小議題'
      },
      {
        prop: 'term_index',
        label: '屆期',
        width: columnWidth(2)
      },
      {
        prop: 'date',
        label: '日期'
      },
      {
        prop: 'name',
        label: '名稱'
      },
      {
        prop: 'aye_count',
        label: '贊成人數'
      },
      {
        prop: 'abstain_count',
        label: '棄權人數'
      },
      {
        prop: 'nay_count',
        label: '反對人數'
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
