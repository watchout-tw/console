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
    id: 'topics',
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
    id: 'speeches',
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
  }
]

for(let submenu of menu) {
  for(let page of submenu.pages) {
    page.routes = {
      list: {
        name: page.id + '_list',
        title: '所有' + page.name
      },
      edit: {
        name: page.id + '_edit',
        title: '編輯' + page.name
      }
    }
  }
}

export default menu
