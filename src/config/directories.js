export default {
  term: {
    id: 'term',
    api: '/console/lab/terms',
    value: 'index',
    label: 'index'
  },
  term_district: {
    id: 'term_district',
    api: '/console/lab/term_districts',
    value: 'district_name',
    label: 'abbreviation'
  },
  term_party: {
    id: 'term_party',
    api: '/console/lab/term_parties',
    value: 'parties.id',
    label: 'parties.abbreviation'
  },
  term_caucus: {
    id: 'term_caucus',
    api: '/console/lab/term_caucuses',
    value: 'caucus.id',
    label: 'caucus.abbreviation'
  },
  party: {
    id: 'party',
    api: '/console/lab/parties',
    value: 'id',
    label: 'name'
  },
  caucus: {
    id: 'caucus',
    api: '/console/lab/caucuses',
    value: 'id',
    label: 'abbreviation'
  },
  committee: {
    id: 'committee',
    api: '/console/lab/committees',
    value: 'name',
    label: 'name'
  },
  zone: {
    id: 'zone',
    api: '/c0ngress/zones',
    value: 'name',
    label: 'name',
    parentModule: 'c0ngress'
  },
  district: {
    id: 'district',
    api: '/c0ngress/unique_districts',
    value: 'name',
    label: 'name',
    parentModule: 'c0ngress'
  },
  general_topic: {
    id: 'general_topic',
    api: '/console/lab/general_topics',
    value: 'id',
    label: 'title'
  },
  specific_topic: {
    id: 'specific_topc',
    api: '/console/lab/specific_topics',
    value: 'id',
    label: 'title'
  },
  act: {
    id: 'act',
    api: '/console/lab/acts',
    value: 'id',
    label: 'title'
  },
  act_dir: {
    id: 'act_dir',
    api: '/console/lab/act_dirs',
    value: 'id',
    label: 'name'
  },
  act_feature: {
    id: 'act_feature',
    api: '/console/lab/act_features',
    value: 'id',
    label: 'feature'
  },
  rep: {
    id: 'rep',
    api: '/console/lab/reps',
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
    api: '/c0ngress/gov_agencies',
    value: 'id',
    label: 'name',
    parentModule: 'c0ngress'
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
        value: 'university_graduate',
        label: '大學'
      },
      {
        value: 'vocational_college_graduate',
        label: '大專'
      },
      {
        value: 'vocational_high_school_graduate',
        label: '專科'
      },
      {
        value: 'high_school_graduate',
        label: '高中'
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
    api: '/console/lab/st_questions',
    value: 'id',
    label: 'question'
  },
  rs_bill: {
    id: 'rs_bill',
    api: '/console/lab/rs_bills',
    value: 'id',
    label: 'version_no' // FIXME: Need to combine multiple fields into label
  },
  rs_tag: {
    id: 'rs_tag',
    api: '/console/lab/rs_tags',
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
    api: '/c0ngress/legislative_steps',
    value: 'id',
    label: 'name',
    parentModule: 'c0ngress'
  },
  session: {
    id: 'session',
    api: '/console/lab/term_sessions',
    value: 'session_index',
    label: 'session_index'
  },
  temp_session: {
    id: 'temp_session',
    api: '/console/lab/term_sessions',
    value: 'temp_session_index',
    label: 'temp_session_index'
  },
  composition_status: {
    id: 'composition_status',
    options: [
      {
        value: 'pending',
        label: '待確認'
      },
      {
        value: 'new',
        label: '最新'
      },
      {
        value: 'regular',
        label: '普通'
      },
      {
        value: 'archived',
        label: '封存'
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
    api: '/console/lab/timelines',
    value: 'id',
    label: 'title'
  },
  timeline_event_type: {
    id: 'timeline_event_type',
    options: [
      {
        value: 'term_start',
        label: '屆期起始'
      },
      {
        value: 'session_start',
        label: '會期起始'
      },
      {
        value: 'reps_assume_office',
        label: '委員就職'
      },
      {
        value: 'rs_statements',
        label: '發言'
      },
      {
        value: 'rs_bills',
        label: '提案'
      },
      {
        value: 'bill_legislative_step',
        label: '提案審議進度'
      },
      {
        value: 'rs_votes',
        label: '表決'
      },
      {
        value: 'data_reports',
        label: '數據分析報告'
      },
      {
        value: 'insights',
        label: '分析評論'
      },
      {
        value: 'social_event',
        label: '社會事件'
      },
      {
        value: 'general_update',
        label: '一般更新'
      }
    ]
  },
  figure_type: {
    id: 'figure_type',
    options: [
      {
        value: 'bill_comparison_bars',
        group: '提案比較',
        label: '法案比較得分'
      },
      {
        value: 'bill_comparison_radar',
        group: '提案比較',
        label: '雷達'
      },
      {
        value: 'bill_comparison_compact_table',
        group: '提案比較',
        label: '精簡列表'
      },
      {
        value: 'bill_comparison_full_table',
        group: '提案比較',
        label: '詳細列表'
      },
      {
        value: 'sponsorship_partisan_count',
        group: '提案連署統計',
        label: '政黨分組計數'
      },
      {
        value: 'sponsorship_total_percentage',
        group: '提案連署統計',
        label: '全體委員比例'
      },
      {
        value: 'sponsorship_partisan_percentage',
        group: '提案連署統計',
        label: '政黨比例'
      },
      {
        value: 'sponsorship_most_stats',
        group: '提案連署統計',
        label: '最多連署'
      },
      {
        value: 'sponsorship_mesh',
        group: '提案連署統計',
        label: '委員網絡'
      },
      {
        value: 'statement_count_by_party',
        group: '發言統計',
        label: '政黨分組計數'
      },
      {
        value: 'statement_position_count_by_party',
        group: '發言統計',
        label: '政黨分組立場分群計數'
      },
      {
        value: 'statement_position_timeline_by_party',
        group: '發言統計',
        label: '政黨分組立場分群時間軸'
      },
      {
        value: 'statement_word_cloud_by_party',
        group: '發言統計',
        label: '政黨分組文字雲'
      },
      {
        value: 'statement_bubble_by_rep',
        group: '發言統計',
        label: '委員氣泡'
      },
      {
        value: 'statement_timeline_by_rep',
        group: '發言統計',
        label: '委員時間軸'
      }
    ]
  },
  figure: {
    id: 'figure',
    api: '/console/comp/figures',
    value: 'id',
    label: 'title'
  },
  figure_data_set_type: {
    id: 'figure_data_set_type',
    options: [
      {
        value: 'LAB_Bill_Data_Set',
        group: '議題實驗室',
        label: '提案資料集'
      },
      {
        value: 'LAB_Statement_Data_Set',
        group: '議題實驗室',
        label: '發言資料集'
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
        value: 'statement_stats',
        label: '發言統計'
      }
    ]
  }
}
