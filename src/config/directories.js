export default {
  term: {
    id: 'term',
    api: 'terms',
    value: 'index',
    label: 'index'
  },
  term_district: {
    id: 'term_district',
    api: 'term_districts',
    value: 'district_name',
    label: 'abbreviation'
  },
  term_party: {
    id: 'term_party',
    api: 'term_parties',
    value: 'parties.id',
    label: 'parties.abbreviation'
  },
  term_caucus: {
    id: 'term_caucus',
    api: 'term_caucuses',
    value: 'caucus.id',
    label: 'caucus.abbreviation'
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
    label: 'abbreviation'
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
    api: 'district_unique_names',
    value: 'name',
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
  principle_sponsor_type: {
    id: 'principle_sponsor_type',
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
  gov_agency: {
    id: 'gov_agency',
    api: 'gov_agencies',
    value: 'id',
    label: 'name'
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
        label: '任期屆滿'
      },
      {
        value: 'leave_office',
        label: '離任'
      }
    ]
  },
  rep_term_duty: {
    id: 'rep_term_duty',
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
        value: 'against',
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
  },
  composition_status: {
    id: 'composition_status',
    options: [
      {
        value: 'active',
        label: '😎'
      },
      {
        value: 'inactive',
        label: '👻'
      }
    ]
  },
  timeline_type: {
    id: 'timeline_type',
    options: [
      {
        value: 'basic',
        label: '基本'
      }
    ]
  },
  timeline: {
    id: 'timeline',
    api: 'timelines',
    value: 'id',
    label: 'title'
  },
  timeline_event_type: {
    id: 'timeline_event_type',
    options: [
      {
        value: 'external',
        label: '外部事件'
      },
      {
        value: 'term_start_date',
        label: '屆期起始日'
      },
      {
        value: 'session_start_date',
        label: '會期起始日'
      },
      {
        value: 'rep_assume_office',
        label: '委員就職日'
      },
      {
        value: 'rs_statement',
        label: '發言'
      },
      {
        value: 'rs_bill',
        label: '提案'
      },
      {
        value: 'bill_legislative_step',
        label: '提案審議進度'
      },
      {
        value: 'rs_vote',
        label: '表決'
      }
    ]
  },
  figure_type: {
    id: 'figure_type',
    options: [
      {
        value: 'bill_comparison_score_by_feature',
        label: '提案比較：法案比較得分'
      },
      {
        value: 'bill_comparison_radar',
        label: '提案比較：雷達'
      },
      {
        value: 'bill_comparison_compact_table',
        label: '提案比較：精簡列表'
      },
      {
        value: 'bill_comparison_full_table',
        label: '提案比較：詳細列表'
      },
      {
        value: 'sponsorship_count_by_party',
        label: '提案連署統計：政黨分組計數'
      },
      {
        value: 'sponsorship_mesh_by_rep',
        label: '提案連署統計：委員網絡'
      },
      {
        value: 'statement_count_by_party',
        label: '發言統計：政黨分組計數'
      },
      {
        value: 'statement_position_count_by_party',
        label: '發言統計：政黨分組立場分群計數'
      },
      {
        value: 'statement_position_timeline_by_party',
        label: '發言統計：政黨分組立場分群時間軸'
      },
      {
        value: 'statement_word_cloud_by_party',
        label: '發言統計：政黨分組文字雲'
      },
      {
        value: 'statement_bubble_by_rep',
        label: '發言統計：委員氣泡'
      },
      {
        value: 'statement_timeline_by_rep',
        label: '發言統計：委員時間軸'
      }
    ]
  },
  figure_data_set_type: {
    id: 'figure_data_set_type',
    options: [
      {
        value: 'LAB_Bill_Data_Set',
        label: '《議題實驗室》提案資料集'
      },
      {
        value: 'LAB_Statement_Data_Set',
        label: '《議題實驗室》發言資料集'
      }
    ]
  },
  lab_data_report_type: {
    id: 'lab_data_report_type',
    options: [
      {
        value: 'bill_comparison',
        label: '提案比較'
      },
      {
        value: 'sponsorship_stats',
        label: '提案連署統計'
      },
      {
        value: 'statement_stats_by_party',
        label: '政黨發言統計'
      },
      {
        value: 'statement_stats_by_rep',
        label: '委員發言統計'
      }
    ]
  }
}
