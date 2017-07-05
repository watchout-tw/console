import { labelWidth } from '@/util/element'

export default {
  term: {
    sections: [
      {
        id: 'base',
        title: '屆期',
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
              type: 'date'
            },
            {
              id: 'end_date',
              label: '終止日',
              type: 'date'
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
              type: 'date'
            },
            {
              prop: 'end_date',
              label: '訖',
              type: 'date'
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
          id: 'party'
        }
      },
      {
        id: 'caucuses',
        title: '黨團、政團',
        description: '這個屆期所有曾經有席次的黨團、政團',
        interface: {
          type: 'checklist',
          id: 'caucus'
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
        title: '委員會',
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
  district: {
    sections: [
      {
        id: 'base',
        title: '選區',
        description: '選區基本資料',
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
              id: 'zone_name',
              label: '區域',
              type: 'select',
              directory: 'zone'
            },
            {
              id: 'index',
              label: '編號',
              type: 'number'
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
        title: '政黨',
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
        title: '黨團或政團',
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
        title: '委員',
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
              type: 'date'
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
              type: 'textarea'
            },
            {
              id: 'experience',
              label: '經歷',
              type: 'textarea'
            },
            {
              id: 'policy_proposal',
              label: '政見',
              type: 'textarea'
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
              type: 'checkbox'
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
        id: 'party_history',
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
              directory: 'term'
            },
            {
              prop: 'party_id',
              label: '政黨',
              type: 'select',
              directory: 'party'
            },
            {
              prop: 'caucus_id',
              label: '黨團或政團',
              type: 'select',
              directory: 'caucus'
            },
            {
              prop: 'start_date',
              label: '起始日期',
              type: 'date'
            },
            {
              prop: 'is_officer',
              label: '幹部',
              type: 'checkbox'
            },
            {
              prop: 'officer_title',
              label: '職稱',
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
        id: 'election_history',
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
              type: 'date'
            },
            {
              prop: 'change_type',
              label: '變更類型',
              type: 'select',
              directory: 'rep_term_change_type'
            },
            {
              prop: 'district',
              label: '選區',
              type: 'select',
              directory: 'district'
            },
            {
              prop: 'office',
              label: '院內職務',
              type: 'select',
              directory: 'rep_term_office'
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
        id: 'committee_history',
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
              type: 'number'
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
              type: 'checkbox'
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
        title: '大議題',
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
          id: 'specific_topic'
        }
      }
    ]
  },
  specific_topic: {
    sections: [
      {
        id: 'base',
        title: '小議題',
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
          id: 'general_topic'
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
        title: '法案',
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
        description: '與這個大議題相關的小議題',
        interface: {
          type: 'checklist',
          id: 'specific_topic'
        }
      }
    ]
  },
  act_feature: {
    sections: [
      {
        id: 'base',
        title: '法案比較',
        description: '這個法案比較的基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'specific_topic',
              label: '小議題',
              type: 'select',
              directory: 'specific_topic'
            },
            {
              id: 'act_dir',
              label: '修法方向',
              type: 'select',
              directory: 'act_dir'
            },
            {
              id: 'act',
              label: '法案',
              type: 'select',
              directory: 'act'
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
      }
    ]
  },
  statement: {
    sections: [
      {
        id: 'base',
        title: '屆期',
        description: '這個發言的基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'specific_topic',
              label: '關聯小議題',
              type: 'select',
              directory: 'specific_topic'
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
              type: 'select',
              directory: 'committee'
            },
            {
              id: 'speech_date',
              label: '發言日期',
              type: 'date'
            },
            {
              id: 'term_index',
              label: '屆期',
              type: 'select',
              directory: 'term'
            },
            {
              id: 'session_index',
              label: '會期',
              type: 'number'
            },
            {
              id: 'rep',
              label: '委員',
              type: 'select',
              directory: 'rep'
            },
            {
              id: 'rep_party',
              label: '政黨',
              type: 'select',
              directory: 'party'
            },
            {
              id: 'speech_content',
              label: '發言內容',
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
              id: 'summary',
              label: '摘要',
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
              type: 'select',
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
