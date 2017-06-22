let repHistoryFormatter = (row, col) => {
  return row.history.map((event) => {
    return JSON.stringify(event)
  }).join(';')
}

export default {
  terms: {
    filters: ['name'],
    paged: true,
    columns: [
      {
        prop: 'index',
        label: '屆期'
      },
      {
        prop: 'start_date',
        label: '起'
      },
      {
        prop: 'end_date',
        label: '訖'
      },
      {
        prop: 'sessions',
        label: '會期' // Array of 該屆所有的會期 from Term_Session
/*
Array of objects
{
  session_index: 1
  temp_session_index: 1
  start_date: [timestamp]
  end_date: [timestamp]
}
*/
      },
      {
        prop: 'parties',
        label: '政黨' // Array of 該屆所有有席次的政黨 from Term_Party
/*
Array of objects
{
  name: '時代力量'
  abbreviation: '時力'
  emblem: 'npp.png'
  color: '#aaa'
}
*/
      },
      {
        prop: 'caucuses',
        label: '黨團或政團' // Array of 該屆所有有席次的政黨 from Term_Caucus
/*
Array of objects
{
  name: '中國國民黨立法院黨團'
  abbreviation: '國民黨黨團'
  emblem: 'kmt.png'
  color: '#00f'
}
*/
      }
    ]
  },
  committees: {
    filters: ['name'],
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
        label: '分類'
      }
    ]
  },
  reps: {
    filters: ['name', 'term', 'party', 'district'],
    paged: true,
    columns: [
      {
        prop: 'name',
        label: '全名',
        width: 192
      },
      {
        prop: 'history', // Array of 該立委所有的任職歷史 from Rep_Party & Rep_Term...
        label: '任職歷史',
        formatter: repHistoryFormatter
/*
Array of objects:
{
  term: 7
  party_name: '民主進步黨'
  party_abbreviation: '民進黨'
  party_emblem: 'dpp.png'
  party_color: '#fff'
  district_name: '台北市第一選舉區'
  district_abbreviation: '台北一'
  district_zone_name: '台北'
  district_index: 1
  change_type: '應屆就任'
}
*/
      }
    ]
  },
  term_districts: {
    filters: ['term', 'zone'],
    paged: true,
    columns: [
      {
        prop: 'term_index',
        label: '屆期'
      },
      {
        prop: 'district_name', // from District
        label: '選區'
      },
      {
        prop: 'district_zone_name',
        label: '區域'
      },
      {
        prop: 'district_index',
        label: '編號'
      },
      {
        prop: 'neighborhoods',
        label: '選區內行政區'
      }
    ]
  },
  term_parties: {
    filters: ['name'],
    columns: [
      {
        prop: 'term_index',
        label: '屆期'
      },
      {
        prop: 'name', // from Party
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
  term_caucuses: {
    filters: ['name'],
    columns: [
      {
        prop: 'term_index',
        label: '屆期'
      },
      {
        prop: 'name',
        label: '全名' // from Caucus
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
    filters: ['name'],
    columns: [
      {
        prop: 'title',
        label: '標題'
      },
      {
        prop: 'index',
        label: '排序'
      },
      {
        prop: 'image',
        label: '圖像'
      },
      {
        prop: 'specific_topics',
        label: '關聯小議題'
      }
    ]
  },
  specific_topics: {
    filters: ['name', 'general_topic'],
    columns: [
      {
        prop: 'title',
        label: '標題'
      },
      {
        prop: 'index',
        label: '排序'
      },
      {
        prop: 'image',
        label: '圖像'
      },
      {
        prop: 'general_topics',
        label: '關聯大議題'
      },
      {
        prop: 'act_dirs',
        label: '修法方向'
      },
      {
        prop: 'st_questions',
        label: '爭點'
      }
    ]
  },
  acts: {
    filters: ['name', 'specific_topic'],
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
        label: '關聯小議題'
      }
    ]
  },
  act_features: {
    filters: ['specific_topic', 'act', 'act_dir'],
    columns: [
      {
        prop: 'specific_topic',
        label: '關聯小議題'
      },
      {
        prop: 'act',
        label: '關聯法案'
      },
      {
        prop: 'act_dir',
        label: '關聯修法方向'
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
    filters: ['specific_topic', 'term', 'rep', 'party'],
    columns: [
      {
        prop: 'st_title',
        label: '關聯小議題'
      },
      {
        prop: 'term_index',
        label: '屆期'
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
    filters: ['specific_topic', 'term', 'act', 'sponsor_type', 'party', 'sponsor'],
    columns: [
      {
        prop: 'st_title',
        label: '關聯小議題'
      },
      {
        prop: 'term_index',
        label: '屆期'
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
        label: '日期',
        flags: {
          sortable: true
        }
      },
      {
        prop: 'speech_content',
        label: '內容'
      }
    ]
  },
  votes: {
    filters: ['topic', 'term', 'name'],
    columns: [
      {
        prop: 'st_title',
        label: '關聯小議題'
      },
      {
        prop: 'term_index',
        label: '屆期'
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
