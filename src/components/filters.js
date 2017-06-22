export default {
  name: {
    id: 'name',
    label: '名稱',
    type: 'autocomplete'
  },
  term: {
    id: 'term',
    api: 'terms',
    label: '屆期',
    type: 'select'
  },
  party: {
    id: 'party',
    api: 'parties',
    label: '政黨',
    type: 'select'
  },
  zone: {
    id: 'zone',
    api: 'zones',
    label: '區域',
    type: 'select',
    feature: 'grouped'
  },
  district: {
    id: 'district',
    api: 'districts',
    label: '選區',
    type: 'select',
    feature: 'grouped'
  },
  general_topic: {
    id: 'general_topic',
    api: 'general_topics',
    label: '大議題',
    type: 'select'
  },
  specific_topic: {
    id: 'specific_topic',
    api: 'specific_topics',
    label: '小議題',
    type: 'select'
  },
  act: {
    id: 'act',
    api: 'acts',
    label: '法案',
    type: 'select'
  },
  act_dir: {
    id: 'act_dir',
    api: 'act_dirs',
    label: '修法方向',
    type: 'select'
  },
  rep: {
    id: 'rep',
    api: 'reps',
    label: '立法委員',
    type: 'input',
    feature: 'autocomplete'
  },
  sponsor_type: {
    id: 'sponsor_type',
    api: 'sponsor_types',
    label: '提案者類別',
    type: 'select'
  },
  sponsor: {
    id: 'sponsor',
    api: 'sponsors',
    label: '提案者',
    type: 'select'
  }
}
