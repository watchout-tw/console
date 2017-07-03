export default {
  term: {
    id: 'term',
    api: 'terms',
    value: 'index',
    label: 'index'
  },
  party: {
    id: 'party',
    api: 'parties',
    value: 'id',
    label: 'name'
  },
  caucus: {
    id: 'caucus',
    api: 'caucuses',
    value: 'id',
    label: 'name'
  },
  committee: {
    id: 'committee',
    api: 'committees',
    value: 'name',
    label: 'name'
  },
  zone: {
    id: 'zone',
    api: 'zones',
    value: 'name',
    label: 'name'
  },
  district: {
    id: 'district',
    api: 'districts',
    value: 'id',
    label: 'name'
  },
  general_topic: {
    id: 'general_topic',
    api: 'general_topics',
    value: 'id',
    label: 'title'
  },
  specific_topic: {
    id: 'specific_topc',
    api: 'specific_topics',
    value: 'id',
    label: 'title'
  },
  act: {
    id: 'act',
    api: 'acts',
    value: 'id',
    label: 'title'
  },
  act_dir: {
    id: 'act_dir',
    api: 'act_dirs',
    value: 'id',
    label: 'name'
  },
  rep: {
    id: 'rep',
    api: 'reps',
    value: 'id',
    label: 'name',
    paging: {
      page: true,
      all: true
    }
  },
  sponsor_type: {
    id: 'sponsor_type',
    api: 'sponsor_types'
  },
  sponsor: {
    id: 'sponsor',
    api: 'sponsors'
  },
  committee_category: {
    id: 'committee_category',
    values: [
      {
        value: 'regular',
        label: '常設'
      },
      {
        value: 'ad_hoc',
        label: '特種'
      },
      {
        value: 'other',
        label: '其他'
      }
    ]
  },
  edu_degree: {
    id: 'edu_degree',
    values: [
      {
        value: 'doctorate',
        label: '博士'
      },
      {
        value: 'masters',
        label: '碩士'
      },
      {
        value: 'bachelor',
        label: '學士'
      },
      {
        value: 'high_school',
        label: '高中、高職'
      },
      {
        value: 'middle_school',
        label: '中學'
      },
      {
        value: 'primary_school',
        label: '小學'
      },
      {
        value: 'other',
        label: '其他'
      }
    ]
  },
  rep_term_change_type: {
    id: 'rep_term_change_type',
    values: [
      {
        value: 'assume_office_regular_election',
        label: '應屆就任'
      },
      {
        value: 'assume_office_by_election',
        label: '補選就任'
      },
      {
        value: 'leave_office',
        label: '離任'
      },
      {
        value: 'end_of_term',
        label: '屆期結束'
      }
    ]
  },
  rep_term_office: {
    id: 'rep_term_office',
    values: [
      {
        value: 'speaker',
        label: '院長'
      },
      {
        value: 'deputy_speaker',
        label: '副院長'
      }
    ]
  }
}
