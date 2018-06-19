var menu = [
  {
    id: 'c0ngress',
    name: '立法院',
    pages: [
      {
        id: 'terms',
        directory: 'term',
        editor: 'term',
        routingIndex: 'index',
        name: '屆期',
        title: '屆期、會期'
      },
      {
        id: 'committees',
        directory: 'committee',
        editor: 'committee',
        routingIndex: 'name',
        name: '委員會',
        title: '委員會'
      },
      {
        id: 'reps',
        directory: 'rep',
        editor: 'rep',
        routingIndex: 'id',
        name: '委員',
        title: '委員'
      },
      {
        id: 'parties',
        directory: 'party',
        editor: 'party',
        routingIndex: 'id',
        name: '政黨',
        title: '政黨'
      },
      {
        id: 'caucuses',
        directory: 'caucus',
        editor: 'caucus',
        routingIndex: 'id',
        name: '黨團或政團',
        title: '黨團、政團'
      }
    ]
  },
  {
    id: 'topical_data',
    name: '議題、法案',
    pages: [
      {
        id: 'general_topics',
        directory: 'general_topic',
        editor: 'general_topic',
        routingIndex: 'id',
        name: '大議題',
        title: '大議題'
      },
      {
        id: 'specific_topics',
        directory: 'specific_topic',
        editor: 'specific_topic',
        routingIndex: 'id',
        name: '小議題',
        title: '小議題'
      },
      {
        id: 'acts',
        directory: 'act',
        editor: 'act',
        routingIndex: 'id',
        name: '法案',
        title: '法案'
      },
      {
        id: 'act_features',
        directory: 'act_feature',
        editor: 'act_feature',
        routingIndex: 'id',
        name: '法案比較',
        title: '法案比較'
      }
    ]
  },
  {
    id: 'rep_speech',
    name: '委員表態',
    pages: [
      {
        id: 'rs_statements',
        directory: 'rs_statement',
        editor: 'rs_statement',
        routingIndex: 'id',
        name: '發言',
        title: '發言'
      },
      {
        id: 'rs_bills',
        directory: 'rs_bill',
        editor: 'rs_bill',
        routingIndex: 'id',
        name: '提案',
        title: '提案、連署'
      },
      {
        id: 'rs_votes',
        directory: 'rs_vote',
        editor: 'rs_vote',
        routingIndex: 'id',
        name: '表決',
        title: '表決'
      }
    ]
  },
  {
    id: 'comp',
    name: '內容組成',
    pages: [
      {
        id: 'timeline_events',
        directory: 'timeline_events',
        editor: 'timeline_event',
        routingIndex: 'id',
        name: '大事紀事件',
        title: '大事紀事件'
      },
      {
        id: 'timelines',
        directory: 'timelines',
        editor: 'timeline',
        routingIndex: 'id',
        name: '大事紀',
        title: '大事紀'
      },
      {
        id: 'figures',
        directory: 'figures',
        editor: 'figure',
        routingIndex: 'id',
        name: '圖表',
        title: '圖表'
      },
      {
        id: 'docs',
        directory: 'docs',
        editor: 'doc',
        routingIndex: 'id',
        name: '文件',
        title: '文件'
      }
    ]
  },
  {
    id: 'lab',
    name: '議題實驗室',
    pages: [
      {
        id: 'lab_topic_overviews',
        directory: 'lab_topic_overviews',
        editor: 'lab_topic_overview',
        routingIndex: 'id',
        name: '議題綜覽',
        title: '議題綜覽'
      },
      {
        id: 'lab_insights',
        directory: 'lab_insights',
        editor: 'lab_insight',
        routingIndex: 'id',
        name: '分析評論',
        title: '分析評論'
      },
      {
        id: 'lab_bill_data_sets',
        directory: 'lab_bill_data_sets',
        editor: 'lab_bill_data_set',
        routingIndex: 'id',
        name: '提案資料集',
        title: '提案資料集'
      },
      {
        id: 'lab_statement_data_sets',
        directory: 'lab_statement_data_sets',
        editor: 'lab_statement_data_set',
        routingIndex: 'id',
        name: '發言資料集',
        title: '發言資料集'
      },
      {
        id: 'lab_data_reports',
        directory: 'lab_data_reports',
        editor: 'lab_data_report',
        routingIndex: 'id',
        name: '數據分析報告',
        title: '數據分析報告'
      }
    ]
  },
  {
    id: 'ask',
    name: '給問嗎？',
    pages: [
      {
        id: 'ask_games',
        directory: 'ask_games',
        editor: 'ask_game',
        routingIndex: 'slug',
        name: '給問',
        title: '給問'
      },
      {
        id: 'ask_questions',
        directory: 'ask_questions',
        editor: 'ask_question',
        routingIndex: 'id',
        name: '提問',
        title: '提問'
      },
      {
        id: 'ask_answers',
        directory: 'ask_answers',
        editor: 'ask_answer',
        routingIndex: 'id',
        name: '回答',
        title: '回答'
      }
    ]
  },
  {
    id: 'park',
    name: '中央公園',
    pages: [
      {
        id: 'topics',
        directory: 'topics',
        editor: 'topic',
        routingIndex: 'id',
        name: '議題分類',
        title: '議題分類'
      }
    ]
  }
]

for(let group of menu) {
  for(let page of group.pages) {
    page.basePath = `/${group.id}/${page.id}`
    page.routes = {
      list: {
        path: `${page.basePath}`,
        name: `${group.id}_${page.id}_list`,
        title: page.name
      },
      edit: {
        path: `${page.basePath}/:id`,
        name: `${group.id}_${page.id}_edit`,
        title: '編輯' + page.name
      }
    }
  }
}

export default menu
