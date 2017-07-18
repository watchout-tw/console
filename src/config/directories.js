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
    api: 'term_districts',
    value: 'district_name',
    label: 'district_name'
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
  act_feature: {
    id: 'act_feature',
    api: 'act_features',
    value: 'id',
    label: 'feature'
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
    options: [
      {
        value: 'gov_agency',
        label: '政府單位'
      },
      {
        value: 'caucus',
        label: '黨團或政團'
      },
      {
        value: 'rep',
        label: '委員'
      }
    ]
  },
  committee_category: {
    id: 'committee_category',
    options: [
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
    options: [
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
    options: [
      {
        value: 'assume_office_through_regular_election',
        label: '應屆就任'
      },
      {
        value: 'assume_office_through_by_election',
        label: '補選就任'
      },
      {
        value: 'end_of_term',
        label: '屆期結束'
      },
      {
        value: 'leave_office',
        label: '離任'
      }
    ]
  },
  rep_term_office: {
    id: 'rep_term_office',
    options: [
      {
        value: 'speaker',
        label: '院長'
      },
      {
        value: 'deputy_speaker',
        label: '副院長'
      }
    ]
  },
  st_question: {
    id: 'st_question',
    api: 'st_questions',
    value: 'id',
    label: 'question'
  },
  rs_tag: {
    id: 'rs_tag',
    api: 'rs_tags',
    value: 'id',
    label: 'name'
  },
  rs_position: {
    id: 'rs_position',
    options: [
      {
        value: 'pro',
        label: '支持'
      },
      {
        value: 'ambiguous',
        label: '模糊'
      },
      {
        value: 'con',
        label: '反對'
      }
    ]
  },
  legislative_step: {
    id: 'legislative_step',
    api: 'legislative_steps',
    value: 'id',
    label: 'name'
  },
  session: {
    id: 'session',
    api: 'term_sessions',
    value: 'session_index',
    label: 'session_index'
  },
  temp_session: {
    id: 'temp_session',
    api: 'term_sessions',
    value: 'temp_session_index',
    label: 'temp_session_index'
  }
}
