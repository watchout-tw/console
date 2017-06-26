export default [
  {
    id: 'c0ngress',
    name: '立法院',
    pages: [
      {
        id: 'terms',
        createRouteName: 'terms_create',
        directory: 'term',
        name: '屆期',
        title: '屆期、會期'
      },
      {
        id: 'committees',
        createRouteName: 'committees_create',
        directory: 'committee',
        name: '委員會',
        title: '委員會'
      },
      {
        id: 'reps',
        createRouteName: 'reps_create',
        directory: 'rep',
        name: '委員',
        title: '委員'
      },
      {
        id: 'term_districts',
        createRouteName: 'term_districts_create',
        directory: 'term_district',
        name: '選區',
        title: '選區'
      },
      {
        id: 'term_parties',
        createRouteName: 'term_parties_create',
        directory: 'term_party',
        name: '政黨',
        title: '政黨'
      },
      {
        id: 'term_caucuses',
        createRouteName: 'term_caucuses_create',
        directory: 'term_caucus',
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
        createRouteName: 'general_topics_create',
        directory: 'general_topic',
        name: '大議題',
        title: '大議題'
      },
      {
        id: 'specific_topics',
        createRouteName: 'specific_topics_create',
        directory: 'specific_topic',
        name: '小議題',
        title: '小議題'
      },
      {
        id: 'acts',
        createRouteName: 'acts_create',
        directory: 'act',
        name: '法案',
        title: '法案'
      },
      {
        id: 'act_features',
        createRouteName: 'act_features_create',
        directory: 'act_feature',
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
        id: 'statements',
        createRouteName: 'statements_create',
        directory: 'statement',
        name: '發言',
        title: '發言'
      },
      {
        id: 'sponsorships',
        createRouteName: 'sponsorships_create',
        directory: 'sponsorship',
        name: '提案',
        title: '提案、連署'
      },
      {
        id: 'votes',
        createRouteName: 'votes_create',
        directory: 'vote',
        name: '表決',
        title: '表決'
      }
    ]
  }
]
