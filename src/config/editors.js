import { labelWidth } from '@/util/element'
import formatters from '@/config/formatters'
import * as preparers from '@/config/preparers'
import cascade from '@/util/cascade'

export default {
  term: {
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '這個屆期的基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'index',
              label: '屆期',
              type: 'number'
            },
            {
              id: 'start_date',
              label: '起始日',
              type: 'date',
              postPreparer: preparers.date2Timestamp
            },
            {
              id: 'end_date',
              label: '終止日',
              type: 'date',
              postPreparer: preparers.date2Timestamp
            }
          ],
          options: {
            labelWidth: labelWidth(4)
          }
        }
      },
      {
        id: 'sessions',
        title: '會期',
        description: '這個屆期的所有會期、臨時會會期',
        interface: {
          type: 'table',
          name: '會期',
          columns: [
            {
              prop: 'session_index',
              label: '會期',
              type: 'number'
            },
            {
              prop: 'temp_session_index',
              label: '臨時會期',
              type: 'number'
            },
            {
              prop: 'start_date',
              label: '起',
              type: 'date',
              formatter: formatters.date,
              postPreparer: preparers.date2Timestamp
            },
            {
              prop: 'end_date',
              label: '訖',
              type: 'date',
              formatter: formatters.date,
              postPreparer: preparers.date2Timestamp
            }
          ]
        }
      },
      {
        id: 'parties',
        title: '政黨',
        description: '這個屆期所有曾經有席次的政黨',
        interface: {
          type: 'checklist',
          id: 'party',
          directory: 'party'
        }
      },
      {
        id: 'caucuses',
        title: '黨團、政團',
        description: '這個屆期所有曾經有席次的黨團或政團',
        interface: {
          type: 'table',
          name: '黨團或政團',
          columns: [
            {
              prop: 'caucus_id',
              label: '黨團或政團',
              type: 'select',
              directory: 'caucus'
            },
            {
              prop: 'party_id_array',
              label: '關聯政黨',
              type: 'multiselect',
              directory: 'party'
            }
          ]
        }
      },
      {
        id: 'districts',
        title: '選區',
        description: '這個屆期的所有選區',
        interface: {
          type: 'table',
          name: '選區',
          columns: [
            {
              prop: 'name',
              label: '全名',
              type: 'text'
            },
            {
              prop: 'abbreviation',
              label: '短名',
              type: 'text'
            },
            {
              prop: 'zone_name',
              label: '區域',
              type: 'select',
              directory: 'zone'
            },
            {
              prop: 'index',
              label: '編號',
              type: 'number'
            },
            {
              prop: 'neighborhoods',
              label: '選區內行政區',
              type: 'text'
            }
          ]
        }
      }
    ]
  },
  committee: {
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '委員會基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'name',
              label: '全名',
              type: 'text'
            },
            {
              id: 'abbreviation',
              label: '短名',
              type: 'text'
            },
            {
              id: 'category',
              label: '分類',
              type: 'select',
              directory: 'committee_category'
            }
          ],
          options: {
            labelWidth: labelWidth(3)
          }
        }
      }
    ]
  },
  party: {
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '政黨基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'name',
              label: '全名',
              type: 'text'
            },
            {
              id: 'abbreviation',
              label: '短名',
              type: 'text'
            },
            {
              id: 'emblem',
              label: '代表徽章',
              type: 'text'
            },
            {
              id: 'color',
              label: '代表色',
              type: 'color'
            },
            {
              id: 'basic_info',
              label: '基本資訊',
              type: 'textarea'
            },
            {
              id: 'add_info',
              label: '補充資訊',
              type: 'textarea'
            }
          ],
          options: {
            labelWidth: labelWidth(5)
          }
        }
      }
    ]
  },
  caucus: {
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '黨團或政團基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'name',
              label: '全名',
              type: 'text'
            },
            {
              id: 'abbreviation',
              label: '短名',
              type: 'text'
            },
            {
              id: 'emblem',
              label: '代表徽章',
              type: 'text'
            },
            {
              id: 'color',
              label: '代表色',
              type: 'color'
            },
            {
              id: 'basic_info',
              label: '基本資訊',
              type: 'textarea'
            },
            {
              id: 'add_info',
              label: '補充資訊',
              type: 'textarea'
            }
          ],
          options: {
            labelWidth: labelWidth(5)
          }
        }
      }
    ]
  },
  rep: {
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '委員基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'name',
              label: '全名',
              type: 'text'
            },
            {
              id: 'birth_date',
              label: '出生日期',
              type: 'date',
              postPreparer: preparers.date2Timestamp
            },
            {
              id: 'gender',
              label: '性別',
              type: 'gender'
            },
            {
              id: 'highest_edu_degree',
              label: '最高學歷',
              type: 'select',
              directory: 'edu_degree'
            },
            {
              id: 'edu_record',
              label: '學歷',
              type: 'textarea',
              postPreparer: preparers.text2Array
            },
            {
              id: 'experience',
              label: '經歷',
              type: 'textarea',
              postPreparer: preparers.text2Array
            },
            {
              id: 'policy_proposal',
              label: '政見',
              type: 'textarea',
              postPreparer: preparers.text2Array
            }
          ],
          options: {
            labelWidth: labelWidth(5)
          }
        }
      },
      {
        id: 'contacts',
        title: '實體聯絡資訊',
        description: '委員的實體聯絡資訊',
        interface: {
          type: 'table',
          name: '實體聯絡資訊',
          columns: [
            {
              prop: 'is_active',
              label: '最新',
              type: 'switch'
            },
            {
              prop: 'name',
              label: '名稱',
              type: 'text'
            },
            {
              prop: 'phone',
              label: '電話',
              type: 'text'
            },
            {
              prop: 'fax',
              label: '傳真',
              type: 'text'
            },
            {
              prop: 'address',
              label: '地址',
              type: 'text'
            }
          ]
        }
      },
      {
        id: 'parties',
        title: '政黨歷史',
        description: '委員的政黨歷史紀錄',
        interface: {
          type: 'table',
          name: '政黨歷史紀錄',
          columns: [
            {
              prop: 'term_index',
              label: '屆期',
              type: 'select',
              directory: 'term',
              cascadeUpdate: [
                cascade.applyConstraint(['party_id', 'caucus_id'], 'term')
              ]
            },
            {
              prop: 'party',
              label: '政黨',
              type: 'select',
              directory: 'party',
              formatter: formatters.name
            },
            {
              prop: 'caucus',
              label: '黨團或政團',
              type: 'select',
              directory: 'caucus',
              formatter: formatters.name
            },
            {
              prop: 'start_date',
              label: '起始日期',
              type: 'date',
              formatter: formatters.date,
              postPreparer: preparers.date2Timestamp
            },
            {
              prop: 'officer_title',
              label: '幹部職稱',
              type: 'text'
            },
            {
              prop: 'note',
              label: '備註',
              type: 'text'
            }
          ]
        }
      },
      {
        id: 'terms',
        title: '選任歷史',
        description: '委員的選任歷史紀錄',
        interface: {
          type: 'table',
          name: '選任歷史紀錄',
          columns: [
            {
              prop: 'term_index',
              label: '屆期',
              type: 'select',
              directory: 'term'
            },
            {
              prop: 'change_date',
              label: '變更日期',
              type: 'date',
              formatter: formatters.date,
              postPreparer: preparers.date2Timestamp
            },
            {
              prop: 'change_type',
              label: '變更類型',
              type: 'select',
              directory: 'rep_term_change_type'
            },
            {
              prop: 'district_name',
              label: '選區',
              type: 'select',
              directory: 'term_district'
            },
            {
              prop: 'duty',
              label: '院內職務',
              type: 'select',
              directory: 'rep_term_duty'
            },
            {
              prop: 'note',
              label: '備註',
              type: 'text'
            }
          ]
        }
      },
      {
        id: 'sessions',
        title: '委員會歷史',
        description: '委員的委員會歷史紀錄',
        interface: {
          type: 'table',
          name: '委員會歷史紀錄',
          columns: [
            {
              prop: 'term_index',
              label: '屆期',
              type: 'select',
              directory: 'term'
            },
            {
              prop: 'session_index',
              label: '會期',
              type: 'select',
              directory: 'session',
              determined_by: 'term_index'
            },
            {
              prop: 'committee_name',
              label: '委員會',
              type: 'select',
              directory: 'committee'
            },
            {
              prop: 'is_convener',
              label: '召委',
              type: 'switch',
              formatter: formatters.boolean
            }
          ]
        }
      }
    ]
  },
  general_topic: {
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '這個大議題的基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'title',
              label: '標題',
              type: 'text'
            },
            {
              id: 'index',
              label: '排序',
              type: 'number'
            },
            {
              id: 'image',
              label: '圖像',
              type: 'text'
            },
            {
              id: 'description',
              label: '敘述',
              type: 'textarea'
            }
          ],
          options: {
            labelWidth: labelWidth(3)
          }
        }
      },
      {
        id: 'specific_topics',
        title: '關聯小議題',
        description: '與這個大議題相關的小議題',
        interface: {
          type: 'checklist',
          id: 'specific_topic',
          directory: 'specific_topic'
        }
      }
    ]
  },
  specific_topic: {
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '這個小議題的基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'title',
              label: '標題',
              type: 'text'
            },
            {
              id: 'index',
              label: '排序',
              type: 'number'
            },
            {
              id: 'image',
              label: '圖像',
              type: 'text'
            },
            {
              id: 'description',
              label: '敘述',
              type: 'textarea'
            }
          ],
          options: {
            labelWidth: labelWidth(3)
          }
        }
      },
      {
        id: 'general_topics',
        title: '關聯大議題',
        description: '與這個小議題相關的大議題',
        interface: {
          type: 'checklist',
          id: 'general_topic',
          directory: 'general_topic'
        }
      },
      {
        id: 'act_dirs',
        title: '修法方向',
        description: '這個小議題的各種修法方向',
        interface: {
          type: 'table',
          name: '修法方向',
          columns: [
            {
              prop: 'name',
              label: '名稱',
              type: 'text'
            },
            {
              prop: 'index',
              label: '排序',
              type: 'number'
            }
          ]
        }
      },
      {
        id: 'st_questions',
        title: '爭點',
        description: '這個小議題的各種爭點',
        interface: {
          type: 'table',
          name: '爭點',
          columns: [
            {
              prop: 'question',
              label: '爭點',
              type: 'text'
            },
            {
              prop: 'index',
              label: '排序',
              type: 'number'
            }
          ]
        }
      }
    ]
  },
  act: {
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '這個法案的基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'title',
              label: '標題',
              type: 'text'
            },
            {
              id: 'official_seq_no',
              label: '院總字號',
              type: 'text'
            }
          ],
          options: {
            labelWidth: labelWidth(5)
          }
        }
      },
      {
        id: 'specific_topics',
        title: '關聯小議題',
        description: '與這個法案相關的小議題',
        interface: {
          type: 'checklist',
          id: 'specific_topic',
          directory: 'specific_topic'
        }
      }
    ]
  },
  act_feature: {
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '這個法案比較的基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'st',
              label: '小議題',
              type: 'select',
              directory: 'specific_topic'
            },
            {
              id: 'act',
              label: '法案',
              type: 'select',
              directory: 'act'
            },
            {
              id: 'act_dir',
              label: '修法方向',
              type: 'select',
              directory: 'act_dir'
            },
            {
              id: 'feature',
              label: '法案比較',
              type: 'text'
            },
            {
              id: 'dir',
              label: '法案比較價值判斷',
              type: 'text'
            },
            {
              id: 'content',
              label: '法案比較內容說明',
              type: 'text'
            }
          ],
          options: {
            labelWidth: labelWidth(9)
          }
        }
      },
      {
        id: 'scale',
        title: '法案比較量尺',
        description: '法案比較的評分量尺',
        interface: {
          type: 'table',
          name: '刻度',
          columns: [
            {
              prop: 'score',
              label: '分數',
              type: 'number'
            },
            {
              prop: 'description',
              label: '分數敘述',
              type: 'text'
            }
          ]
        }
      }
    ]
  },
  rs_statement: {
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '這個發言的基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'st_id',
              label: '關聯小議題',
              type: 'select',
              directory: 'specific_topic'
            },
            {
              id: 'date',
              label: '日期',
              type: 'date',
              postPreparer: preparers.date2Timestamp,
              cascadeUpdate: [
                cascade.lookupTerm(['term_index', 'session_index', 'temp_session_index'])
              ]
            },
            {
              id: 'term_index',
              label: '屆期',
              type: 'select',
              directory: 'term',
              determined_by: 'speech_date',
              disabled: true
            },
            {
              id: 'session_index',
              label: '會期',
              type: 'select',
              directory: 'session',
              determined_by: 'date',
              disabled: true
            },
            {
              id: 'temp_session_index',
              label: '臨時會會期',
              type: 'select',
              directory: 'temp_session',
              determined_by: 'date',
              disabled: true
            },
            {
              id: 'rep',
              label: '委員',
              type: 'select',
              directory: 'rep'
            },
            {
              id: 'rep_party_id',
              label: '當時所屬政黨',
              type: 'select',
              directory: 'party',
              determined_by: 'speech_date'
            },
            {
              id: 'principle_committee',
              label: '主審委員會',
              type: 'select',
              directory: 'committee'
            },
            {
              id: 'joint_committee',
              label: '聯席委員會',
              type: 'multiselect',
              directory: 'committee'
            },
            {
              id: 'content',
              label: '內容',
              type: 'textarea'
            },
            {
              id: 'st_question_id',
              label: '爭點',
              type: 'select',
              directory: 'st_question'
            },
            {
              id: 'position',
              label: '立場',
              type: 'select',
              directory: 'rs_position'
            },
            {
              id: 'position_summary',
              label: '立場摘要',
              type: 'textarea'
            },
            {
              id: 'source_link',
              label: '原始資料連結',
              type: 'text'
            },
            {
              id: 'tag',
              label: '標籤',
              type: 'multiselect-creative',
              directory: 'rs_tag'
            }
          ],
          options: {
            labelWidth: labelWidth(6)
          }
        }
      }
    ]
  },
  rs_bill: {
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '這個提案的基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'act_id',
              label: '關聯法案',
              type: 'select',
              directory: 'act'
            },
            {
              id: 'is_law',
              label: '是否為法律',
              type: 'switch',
              defaultValue: false
            }
          ],
          options: {
            labelWidth: labelWidth(5)
          }
        }
      },
      {
        id: 'law',
        title: '法律',
        description: '法律詳細資訊',
        condition: {
          is_law: true
        },
        interface: {
          type: 'form',
          fields: [
            {
              id: 'law_version_no',
              label: '版本',
              type: 'text'
            },
            {
              id: 'data_source_link',
              label: '資料來源連結',
              type: 'text'
            }
          ],
          options: {
            labelWidth: labelWidth(7)
          }
        }
      },
      {
        id: 'proposal',
        title: '提案',
        description: '提案詳細資訊',
        condition: {
          is_law: false
        },
        interface: {
          type: 'form',
          fields: [
            {
              id: 'date',
              label: '日期',
              type: 'date',
              postPreparer: preparers.date2Timestamp,
              cascadeUpdate: [
                cascade.lookupTerm(['term_index', 'session_index', 'temp_session_index'])
              ]
            },
            {
              id: 'term_index',
              label: '屆期',
              type: 'select',
              directory: 'term',
              determined_by: 'date',
              disabled: true
            },
            {
              id: 'session_index',
              label: '會期',
              type: 'select',
              directory: 'session',
              determined_by: 'date',
              disabled: true
            },
            {
              id: 'temp_session_index',
              label: '臨時會期',
              type: 'select',
              directory: 'temp_session',
              determined_by: 'date',
              disabled: true
            },
            {
              id: 'proposal_no',
              label: '字號',
              type: 'text'
            },
            {
              id: 'principle_sponsor_type',
              label: '第一提案人類別',
              type: 'select',
              directory: 'principle_sponsor_type',
              cascadeUpdate: [
                cascade.appointDirectory(['principle_sponsor_value'])
              ]
            },
            {
              id: 'principle_sponsor_value',
              label: '第一提案人',
              type: 'select'
            },
            {
              id: 'sponsors',
              label: '提案人',
              type: 'multiselect',
              directory: 'rep'
            },
            {
              id: 'cosponsors',
              label: '連署人',
              type: 'multiselect',
              directory: 'rep'
            },
            {
              id: 'content',
              label: '內容',
              type: 'textarea'
            },
            {
              id: 'data_source_link',
              label: '資料來源連結',
              type: 'text'
            },
            {
              id: 'progress_source_link',
              label: '進程來源連結',
              type: 'text'
            }
          ],
          options: {
            labelWidth: labelWidth(7)
          }
        }
      },
      {
        id: 'progress',
        title: '審議進度',
        description: '本提案的審議進度',
        condition: {
          is_law: false
        },
        interface: {
          type: 'table',
          name: '審議進度',
          columns: [
            {
              prop: 'date',
              label: '日期',
              type: 'date',
              postPreparer: preparers.date2Timestamp
            },
            {
              prop: 'progress',
              label: '審議進度',
              type: 'select',
              directory: 'legislative_step'
            }
          ]
        }
      },
      {
        id: 'st_questions',
        title: '爭點',
        description: '本提案的爭點立場判斷',
        interface: {
          type: 'table',
          name: '爭點立場判斷',
          columns: [
            {
              prop: 'specific_topic',
              label: '小議題',
              type: 'select',
              directory: 'specific_topic'
            },
            {
              prop: 'st_question_id',
              label: '爭點',
              type: 'select',
              directory: 'st_question'
            },
            {
              prop: 'position',
              label: '立場',
              type: 'select',
              directory: 'rs_position'
            }
          ]
        }
      },
      {
        id: 'act_features',
        title: '法案比較',
        description: '與本提案關聯的法案比較',
        interface: {
          type: 'table',
          name: '法案比較',
          columns: [
            {
              prop: 'specific_topic',
              label: '小議題',
              type: 'select',
              directory: 'specific_topic'
            },
            {
              prop: 'act_dir',
              label: '修法方向',
              type: 'select',
              directory: 'act_dir'
            },
            {
              prop: 'act_feature',
              label: '法案比較',
              type: 'select',
              directory: 'act_feature'
            },
            {
              prop: 'short_content',
              label: '簡短內容',
              type: 'text'
            },
            {
              prop: 'content',
              label: '完整內容',
              type: 'text'
            }
          ]
        }
      }
    ]
  },
  rs_vote: {
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '這個表決的基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'st_id',
              label: '關聯小議題',
              type: 'select',
              directory: 'specific_topic'
            },
            {
              id: 'date',
              label: '日期',
              type: 'date',
              postPreparer: preparers.date2Timestamp,
              cascadeUpdate: [
                cascade.lookupTerm(['term_index', 'session_index', 'temp_session_index'])
              ]
            },
            {
              id: 'term_index',
              label: '屆期',
              type: 'select',
              directory: 'term',
              determined_by: 'date',
              disabled: true
            },
            {
              id: 'session_index',
              label: '會期',
              type: 'select',
              directory: 'session',
              determined_by: 'date',
              disabled: true
            },
            {
              id: 'temp_session_index',
              label: '臨時會期',
              type: 'select',
              directory: 'temp_session',
              determined_by: 'date',
              disabled: true
            },
            {
              id: 'title',
              label: '標題',
              type: 'text'
            },
            {
              id: 'content',
              label: '內容',
              type: 'textarea'
            },
            {
              id: 'aye',
              label: '贊成',
              type: 'multiselect',
              directory: 'rep'
            },
            {
              id: 'nay',
              label: '反對',
              type: 'multiselect',
              directory: 'rep'
            },
            {
              id: 'abstain',
              label: '棄權',
              type: 'multiselect',
              directory: 'rep'
            },
            {
              id: 'absence',
              label: '缺席',
              type: 'multiselect',
              directory: 'rep'
            },
            {
              id: 'g0v_link',
              label: 'g0v連結',
              type: 'text'
            },
            {
              id: 'source_link',
              label: '原始資料連結',
              type: 'text'
            },
            {
              id: 'tag',
              label: '標籤',
              type: 'multiselect-creative',
              directory: 'rs_tag'
            }
          ],
          options: {
            labelWidth: labelWidth(6)
          }
        }
      }
    ]
  }
}
