export default {
  name: {
    id: 'name',
    label: '名稱',
    type: 'input'
  },
  term: {
    id: 'term',
    directory: 'term',
    label: '屆期',
    type: 'select'
  },
  party: {
    id: 'party',
    directory: 'party',
    label: '政黨',
    type: 'select'
  },
  caucus: {
    id: 'cause',
    directory: 'caucus',
    label: '黨團或政團',
    type: 'select'
  },
  zone: {
    id: 'zone',
    directory: 'zone',
    label: '區域',
    type: 'select',
    feature: {
      grouped: true
    }
  },
  district: {
    id: 'district',
    directory: 'district',
    label: '選區',
    type: 'select',
    feature: {
      grouped: true
    }
  },
  general_topic: {
    id: 'general_topic',
    directory: 'general_topic',
    label: '大議題',
    type: 'select'
  },
  specific_topic: {
    id: 'specific_topic',
    directory: 'specific_topic',
    label: '小議題',
    type: 'select'
  },
  act: {
    id: 'act',
    directory: 'act',
    label: '法案',
    type: 'select'
  },
  act_dir: {
    id: 'act_dir',
    directory: 'act_dir',
    label: '修法方向',
    type: 'select'
  },
  rep: {
    id: 'rep',
    directory: 'rep',
    label: '立法委員',
    type: 'select',
    feature: {
      filterable: true
    }
  },
  sponsor_type: {
    id: 'sponsor_type',
    directory: 'sponsor_type',
    label: '提案者類別',
    type: 'select'
  },
  sponsor: {
    id: 'sponsor',
    directory: 'sponsor',
    label: '提案者',
    type: 'select'
  }
}
