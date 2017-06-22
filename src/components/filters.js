export default {
  name: {
    id: 'name',
    label: '名稱',
    type: 'autocomplete'
  },
  term: {
    id: 'term',
    plural: 'terms',
    label: '屆期',
    type: 'select'
  },
  party: {
    id: 'party',
    plural: 'parties',
    label: '政黨',
    type: 'select'
  },
  zone: {
    id: 'zone',
    plural: 'zones',
    label: '區域',
    type: 'select',
    feature: 'grouped'
  },
  district: {
    id: 'district',
    plural: 'districts',
    label: '選區',
    type: 'select',
    feature: 'grouped'
  },
  general_topic: {
    id: 'general_topic',
    plural: 'general_topics',
    label: '大議題',
    type: 'select'
  },
  specific_topic: {
    id: 'specific_topic',
    plural: 'specific_topics',
    label: '小議題',
    type: 'select'
  },
  act: {
    id: 'act',
    plural: 'acts',
    label: '法案',
    type: 'select'
  },
  act_dir: {
    id: 'act_dir',
    plural: 'act_dirs',
    label: '修法方向',
    type: 'select'
  },
  rep: {
    id: 'rep',
    plural: 'reps',
    label: '立法委員',
    type: 'input',
    feature: 'autocomplete'
  },
  sponsor_type: {
    id: 'sponsor_type',
    plural: 'sponsor_types',
    label: '提案者類別',
    type: 'select'
  },
  sponsor: {
    id: 'sponsor',
    plural: 'sponsors',
    label: '提案者',
    type: 'select'
  }
}
