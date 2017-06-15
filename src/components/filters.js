export default {
  name: {
    id: 'name',
    label: '名稱',
    type: 'autocomplete'
  },
  terms: {
    id: 'terms',
    label: '屆期',
    type: 'select'
  },
  parties: {
    id: 'parties',
    label: '政黨',
    type: 'select'
  },
  zones: {
    id: 'zones',
    label: '區域',
    type: 'select',
    feature: 'grouped'
  },
  districts: {
    id: 'districts',
    label: '選區',
    type: 'select',
    feature: 'grouped'
  },
  topics: {
    id: 'topics',
    label: '議題',
    type: 'select',
    feature: 'grouped'
  },
  acts: {
    id: 'acts',
    label: '法案',
    type: 'select'
  },
  act_dirs: {
    id: 'act_dirs',
    label: '修法方向',
    type: 'select'
  },
  reps: {
    id: 'reps',
    label: '立法委員',
    type: 'input',
    feature: 'autocomplete'
  }
}
