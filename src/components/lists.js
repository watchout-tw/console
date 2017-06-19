let repHistoryFormatter = (row, col) => {
  return row.history.map((event) => {
    return JSON.stringify(event)
  }).join(';')
}

export default {
  terms: {
    filters: ['name'],
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
        label: '會期' // 請給我一個 array，包含該屆所有的會期 from Term_Session
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
        label: '有席次的政黨' // 請給我一個 array，包含是該屆所有有席次的政黨 from Term_Party
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
        label: '有席次的黨團或政團' // 請給我一個 array，包含是該屆所有有席次的政黨 from Term_Caucus
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
    filters: ['name', 'terms', 'parties', 'districts'],
    columns: [
      {
        prop: 'name',
        label: '全名',
        width: 192
      },
      {
        prop: 'history', // 請給我一個 array，包含該立委所有的任職歷史 from Rep_Term...
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
    filters: ['terms', 'zones'],
    columns: [
      {
        prop: 'term_index',
        label: '屆期'
      },
      {
        prop: 'district_name', // 選區詳細資料 from District
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
        prop: 'name', // 政黨詳細資料 from Party
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
        label: '全名' // 黨團或政團詳細資料 from Caucus
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
        label: '小議題' // Array of Specific_Topics
/*
Array of objects
{
  title
  index
  image
}
*/
      }
    ]
  },
  specific_topics: {
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
        prop: 'general_topics',
        label: '大議題' // Array of General_Topics
/*
Array of objects
{
  title
  index
  image
}
*/
      },
      {
        prop: 'act_dirs',
        label: '修法方向'
/*
Array of objects
{
  dir
  index
}
*/
      },
      {
        prop: 'st_questions',
        label: '爭點'
/*
Array of objects
{
  question
  index
}
*/
      }
    ]
  },
  acts: {
    filters: ['topics']
  },
  act_features: {
    filters: ['topics', 'acts', 'act_dirs']
  },
  statements: {
    filters: ['topics', 'terms', 'parties', 'reps'],
    columns: [
      {
        prop: 'st_title',
        label: '小議題'
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
    filters: ['topics', 'terms', 'parties', 'reps', 'acts'],
    columns: [
      {
        prop: 'st_title',
        label: '小議題'
      },
      {
        prop: 'term_index',
        label: '屆期'
      },
      {
        prop: 'principle_sponsor_party_name',
        label: '提案者政黨'
      },
      {
        prop: 'principle_sponsor_name',
        label: '提案者'
      },
      {
        prop: 'sponsors',
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
    filters: ['topics', 'terms', 'name'],
    columns: [
      {
        prop: 'st_title',
        label: '小議題'
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
        label: '贊成'
      },
      {
        prop: 'abstain_count',
        label: '棄權'
      },
      {
        prop: 'nay_count',
        label: '反對'
      },
      {
        prop: 'absence_count',
        label: '缺席'
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
