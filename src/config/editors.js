import { labelWidth } from '@/util/element'
import formatters from '@/config/formatters'
import * as preparers from '@/config/preparers'
import cascade from '@/util/cascade'

export default {
  term: {
    api: '/console/lab/terms',
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
              type: 'number',
              updateForbidden: true,
              required: true
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
          propListIsCalled: 'columns',
          preparerKeyIsAt: 'prop',
          columns: [
            {
              id: 'session_index',
              prop: 'session_index',
              label: '會期',
              type: 'number',
              updateForbidden: true,
              required: true
            },
            {
              id: 'temp_session_index',
              prop: 'temp_session_index',
              label: '臨時會期',
              type: 'number',
              updateForbidden: true,
              required: true
            },
            {
              id: 'start_date',
              prop: 'start_date',
              label: '起',
              type: 'date',
              formatter: formatters.date,
              postPreparer: preparers.date2Timestamp
            },
            {
              id: 'end_date',
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
          directory: 'party',
          postPreparer: preparers.replaceElementInArrayById
        }
      },
      {
        id: 'caucuses',
        title: '黨團、政團',
        description: '這個屆期所有曾經有席次的黨團或政團',
        interface: {
          type: 'table',
          name: '黨團或政團',
          propListIsCalled: 'columns',
          preparerKeyIsAt: 'prop',
          columns: [
            {
              id: 'caucus',
              prop: 'caucus',
              label: '黨團或政團',
              type: 'select',
              directory: 'caucus',
              postPreparer: preparers.replaceById,
              required: true
            },
            {
              id: 'parties',
              prop: 'parties',
              label: '關聯政黨',
              type: 'multiselect',
              directory: 'party',
              getTransformer: preparers.replaceElementInArrayById
            }
          ],
          initRequired: true
        }
      },
      {
        id: 'districts',
        title: '選區',
        description: '這個屆期的所有選區',
        interface: {
          type: 'table',
          name: '選區',
          propListIsCalled: 'columns',
          preparerKeyIsAt: 'prop',
          columns: [
            {
              id: 'name',
              prop: 'name',
              label: '全名',
              type: 'text',
              updateForbidden: true,
              required: true
            },
            {
              id: 'abbreviation',
              prop: 'abbreviation',
              label: '短名',
              type: 'text',
              required: true
            },
            {
              id: 'zone_name',
              prop: 'zone_name',
              label: '區域',
              type: 'select',
              directory: 'zone',
              required: true
            },
            {
              id: 'index',
              prop: 'index',
              label: '編號',
              type: 'number',
              required: true
            },
            {
              id: 'neighborhoods',
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
    api: '/console/lab/committees',
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
              type: 'text',
              updateForbidden: true
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
    api: '/console/lab/parties',
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
              type: 'text',
              required: true
            },
            {
              id: 'abbreviation',
              label: '短名',
              type: 'text',
              required: true
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
    api: '/console/lab/caucuses',
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
    api: '/console/lab/reps',
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
              type: 'text',
              required: true
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
              getTransformer: formatters.longtext,
              postPreparer: preparers.text2Array
            },
            {
              id: 'experience',
              label: '經歷',
              type: 'textarea',
              getTransformer: formatters.longtext,
              postPreparer: preparers.text2Array
            },
            {
              id: 'policy_proposal',
              label: '政見',
              type: 'textarea',
              getTransformer: formatters.longtext,
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
          propListIsCalled: 'columns',
          preparerKeyIsAt: 'prop',
          prepareIndex: 'seq_no',
          columns: [
            {
              id: 'seq_no',
              prop: 'seq_no',
              label: '編號',
              type: 'text',
              hide: true,
              required: true
            },
            {
              id: 'is_active',
              prop: 'is_active',
              label: '最新',
              type: 'switch',
              defaultValue: true,
              formatter: formatters.boolean,
              getTransformer: preparers.int2Boolean,
              postPreparer: preparers.boolean2Int
            },
            {
              id: 'name',
              prop: 'name',
              label: '名稱',
              type: 'text'
            },
            {
              id: 'phone',
              prop: 'phone',
              label: '電話',
              type: 'text'
            },
            {
              id: 'fax',
              prop: 'fax',
              label: '傳真',
              type: 'text'
            },
            {
              id: 'address',
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
          propListIsCalled: 'columns',
          preparerKeyIsAt: 'prop',
          columns: [
            {
              id: 'start_date',
              prop: 'start_date',
              label: '起始日期',
              type: 'date',
              updateForbidden: true,
              formatter: formatters.date,
              postPreparer: preparers.date2Timestamp
            },
            {
              id: 'term_index',
              prop: 'term_index',
              label: '屆期',
              type: 'select',
              directory: 'term',
              cascadeUpdate: [
                cascade.applyConstraint(['party', 'caucus'], 'term')
              ],
              required: true
            },
            {
              id: 'party',
              prop: 'party',
              label: '政黨',
              type: 'select',
              directory: 'term_party',
              formatter: formatters.name,
              postPreparer: preparers.replaceById
            },
            {
              id: 'caucus',
              prop: 'caucus',
              label: '黨團或政團',
              type: 'select',
              directory: 'caucus',
              // FIXME: should be filter by term
              formatter: formatters.name,
              postPreparer: preparers.replaceById
            },
            {
              id: 'officier_title',
              prop: 'officer_title',
              label: '幹部職稱',
              type: 'text'
            },
            {
              id: 'note',
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
          propListIsCalled: 'columns',
          preparerKeyIsAt: 'prop',
          columns: [
            {
              id: 'change_date',
              prop: 'change_date',
              label: '變更日期',
              type: 'date',
              formatter: formatters.date,
              postPreparer: preparers.date2Timestamp
            },
            {
              id: 'term_index',
              prop: 'term_index',
              label: '屆期',
              type: 'select',
              directory: 'term',
              updateForbidden: true,
              required: true
            },
            {
              id: 'change_type',
              prop: 'change_type',
              label: '變更類型',
              type: 'select',
              directory: 'rep_term_change_type',
              updateForbidden: true,
              required: true
            },
            {
              id: 'district_name',
              prop: 'district_name',
              label: '選區',
              type: 'select',
              directory: 'term_district'
            },
            {
              id: 'duty',
              prop: 'duty',
              label: '院內職務',
              type: 'select',
              directory: 'rep_term_duty'
            },
            {
              id: 'note',
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
          propListIsCalled: 'columns',
          preparerKeyIsAt: 'prop',
          columns: [
            {
              id: 'term_index',
              prop: 'term_index',
              label: '屆期',
              type: 'select',
              directory: 'term',
              updateForbidden: true,
              cascadeUpdate: [
                cascade.applyConstraint(['session_index'], 'term')
              ],
              required: true
            },
            {
              id: 'session_index',
              prop: 'session_index',
              label: '會期',
              type: 'select',
              directory: 'session',
              determined_by: 'term_index',
              updateForbidden: true,
              required: true
            },
            {
              id: 'committee_name',
              prop: 'committee_name',
              label: '委員會',
              type: 'select',
              directory: 'committee',
              updateForbidden: true,
              required: true
            },
            {
              id: 'is_convener',
              prop: 'is_convener',
              label: '召委',
              type: 'switch',
              defaultValue: false,
              formatter: formatters.boolean,
              getTransformer: preparers.int2Boolean,
              postPreparer: preparers.boolean2Int
            }
          ]
        }
      }
    ]
  },
  general_topic: {
    api: '/console/lab/general_topics',
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
              type: 'text',
              required: true
            },
            {
              id: 'index',
              label: '排序',
              type: 'number'
            },
            {
              id: 'image',
              label: '圖像',
              type: 'text',
              required: true
            },
            {
              id: 'description',
              label: '敘述',
              type: 'textarea',
              required: true
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
          directory: 'specific_topic',
          postPreparer: preparers.mapChecklist
        }
      }
    ]
  },
  specific_topic: {
    api: '/console/lab/specific_topics',
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
              type: 'text',
              required: true
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
          directory: 'general_topic',
          postPreparer: preparers.mapChecklist
        }
      },
      {
        id: 'act_dirs',
        title: '修法方向',
        description: '這個小議題的各種修法方向',
        interface: {
          type: 'table',
          name: '修法方向',
          propListIsCalled: 'columns',
          preparerKeyIsAt: 'prop',
          columns: [
            {
              id: 'name',
              prop: 'name',
              label: '名稱',
              type: 'text'
            },
            {
              id: 'index',
              prop: 'index',
              label: '排序',
              type: 'number',
              required: true
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
          propListIsCalled: 'columns',
          preparerKeyIsAt: 'prop',
          columns: [
            {
              id: 'question',
              prop: 'question',
              label: '爭點',
              type: 'text'
            },
            {
              id: 'index',
              prop: 'index',
              label: '排序',
              type: 'number',
              required: true
            }
          ]
        }
      }
    ]
  },
  act: {
    api: '/console/lab/acts',
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
              type: 'text',
              required: true
            },
            {
              id: 'official_seq_no',
              label: '院總字號',
              type: 'number'
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
          directory: 'specific_topic',
          postPreparer: preparers.mapChecklist
        }
      }
    ]
  },
  act_feature: {
    api: '/console/lab/act_features',
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
              directory: 'specific_topic',
              cascadeUpdate: [
                cascade.applyConstraint(['act', 'act_dir'], 'st')
              ],
              required: true
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
              type: 'text',
              required: true
            },
            {
              id: 'dir',
              label: '法案比較價值判斷',
              type: 'text',
              required: true
            },
            {
              id: 'content',
              label: '法案比較內容說明',
              type: 'text',
              required: true
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
          propListIsCalled: 'columns',
          preparerKeyIsAt: 'prop',
          columns: [
            {
              id: 'score',
              prop: 'score',
              label: '分數',
              type: 'number'
            },
            {
              id: 'description',
              prop: 'description',
              label: '分數敘述',
              type: 'text',
              required: true
            }
          ]
        }
      }
    ]
  },
  rs_statement: {
    api: '/console/lab/rs_statements',
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
              directory: 'specific_topic',
              cascadeUpdate: [
                cascade.applyConstraint(['st_question_id'], 'st')
              ],
              required: true
            },
            {
              id: 'date',
              label: '日期',
              type: 'date',
              postPreparer: preparers.date2Timestamp,
              cascadeUpdate: [
                cascade.lookupTerm(['term_index', 'session_index', 'temp_session_index']),
                cascade.applyParty(['rep_party_id'])
              ],
              required: true
            },
            {
              id: 'term_index',
              label: '屆期',
              type: 'number',
              determined_by: 'date',
              disabled: true
            },
            {
              id: 'session_index',
              label: '會期',
              type: 'number',
              determined_by: 'date',
              disabled: true
            },
            {
              id: 'temp_session_index',
              label: '臨時會期',
              type: 'number',
              determined_by: 'date',
              disabled: true
            },
            {
              id: 'rep_id',
              label: '委員',
              type: 'select',
              directory: 'rep',
              cascadeUpdate: [
                cascade.applyParty(['rep_party_id'])
              ],
              required: true
            },
            {
              id: 'rep_party_id',
              label: '當時所屬政黨',
              type: 'select',
              directory: 'party',
              determined_by: 'speech_date',
              required: true
            },
            {
              id: 'principle_committee',
              label: '主審委員會',
              type: 'select',
              directory: 'committee'
            },
            {
              id: 'joint_committees',
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
              directory: 'st_question',
              required: true
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
              id: 'tags',
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
    api: '/console/lab/rs_bills',
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
              directory: 'act',
              cascadeCrossSection: {
                act_features: ['st_id']
              }
            },
            {
              id: 'is_law',
              label: '是否為法律',
              type: 'switch',
              defaultValue: false,
              updateForbidden: true,
              getTransformer: preparers.int2Boolean,
              postPreparer: preparers.boolean2Int
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
              id: 'version_no',
              label: '版本',
              type: 'text',
              required: true
            },
            {
              id: 'date',
              label: '日期',
              type: 'date',
              postPreparer: preparers.date2Timestamp
            },
            {
              id: 'data_source_link',
              label: '資料來源連結',
              type: 'text'
            },
            {
              id: 'tags',
              label: '標籤',
              type: 'multiselect-creative',
              directory: 'rs_tag'
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
              type: 'number',
              determined_by: 'date',
              disabled: true
            },
            {
              id: 'session_index',
              label: '會期',
              type: 'number',
              determined_by: 'date',
              disabled: true
            },
            {
              id: 'temp_session_index',
              label: '臨時會期',
              type: 'number',
              determined_by: 'date',
              disabled: true
            },
            {
              id: 'version_no',
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
              type: 'select',
              getTransformer: preparers.tryToParseInt
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
            },
            {
              id: 'tags',
              label: '標籤',
              type: 'multiselect-creative',
              directory: 'rs_tag'
            }
          ],
          options: {
            labelWidth: labelWidth(7)
          }
        }
      },
      {
        id: 'legislative_steps',
        title: '審議進度',
        description: '本提案的審議進度',
        condition: {
          is_law: false
        },
        interface: {
          type: 'table',
          name: '審議進度',
          propListIsCalled: 'columns',
          preparerKeyIsAt: 'prop',
          columns: [
            {
              id: 'date',
              prop: 'date',
              label: '日期',
              type: 'date',
              formatter: formatters.date,
              postPreparer: preparers.date2Timestamp
            },
            {
              id: 'legislative_step_id',
              prop: 'legislative_step_id',
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
          propListIsCalled: 'columns',
          preparerKeyIsAt: 'prop',
          columns: [
            {
              id: 'st_id',
              prop: 'st_id',
              label: '小議題',
              type: 'select',
              directory: 'specific_topic',
              cascadeUpdate: [
                cascade.applyConstraint(['st_question_id'], 'st')
              ],
              deleteThisBeforePost: true
            },
            {
              id: 'st_question_id',
              prop: 'st_question_id',
              label: '爭點',
              type: 'select',
              directory: 'st_question'
            },
            {
              id: 'position',
              prop: 'position',
              label: '立場',
              type: 'select',
              directory: 'rs_position',
              required: true
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
          propListIsCalled: 'columns',
          preparerKeyIsAt: 'prop',
          columns: [
            {
              id: 'st_id',
              prop: 'st_id',
              label: '小議題',
              type: 'select',
              directory: 'specific_topic',
              cascadeUpdate: [
                cascade.applyConstraint(['act_dir_id'], 'st')
              ],
              cascadeAction: {
                keyName: 'specific_topics',
                labelName: 'title',
                valueName: 'id'
              },
              deleteThisBeforePost: true,
              disabled: true
            },
            {
              id: 'act_dir_id',
              prop: 'act_dir_id',
              label: '修法方向',
              type: 'select',
              directory: 'act_dir',
              cascadeUpdate: [
                cascade.applyConstraint(['act_feature_id'], 'act_dir')
              ],
              disabled: true,
              dependency: 'st_id'
            },
            {
              id: 'act_feature_id',
              prop: 'act_feature_id',
              label: '法案比較',
              type: 'select',
              directory: 'act_feature',
              disabled: true,
              dependency: 'act_dir_id'
            },
            {
              id: 'short_content',
              prop: 'short_content',
              label: '簡短內容',
              type: 'text',
              required: true
            },
            {
              id: 'content',
              prop: 'content',
              label: '完整內容',
              type: 'textarea',
              formatter: formatters.markdown,
              required: true
            }
          ]
        }
      }
    ]
  },
  rs_vote: {
    api: '/console/lab/rs_votes',
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
              type: 'number',
              determined_by: 'date',
              disabled: true
            },
            {
              id: 'session_index',
              label: '會期',
              type: 'number',
              determined_by: 'date',
              disabled: true
            },
            {
              id: 'temp_session_index',
              label: '臨時會期',
              type: 'number',
              determined_by: 'date',
              disabled: true
            },
            {
              id: 'title',
              label: '標題',
              type: 'text',
              required: true
            },
            {
              id: 'content',
              label: '內容',
              type: 'textarea',
              required: true
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
              type: 'text',
              required: true
            },
            {
              id: 'source_link',
              label: '原始資料連結',
              type: 'text',
              required: true
            },
            {
              id: 'tags',
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
  timeline_event: {
    api: '/console/comp/timeline_events',
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '這個大事紀事件的基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'status',
              label: '狀態',
              type: 'select',
              directory: 'composition_status'
            },
            {
              id: 'slug',
              label: '短網址',
              type: 'text'
            },
            {
              id: 'date',
              label: '日期',
              type: 'date'
            },
            {
              id: 'type',
              label: '類型',
              type: 'select',
              directory: 'timeline_event_type'
            },
            {
              id: 'image',
              label: '圖像',
              type: 'text'
            },
            {
              id: 'tagline',
              label: '標語',
              type: 'text'
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
              id: 'link',
              label: '連結',
              type: 'text'
            }
          ]
        }
      },
      {
        id: 'data',
        title: '進階資料',
        description: '這個大事紀事件的進階資料',
        interface: {
          type: 'form'
        }
      }
    ]
  },
  timeline: {
    api: '/console/comp/timelines',
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '這個大事紀的基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'status',
              label: '狀態',
              type: 'select',
              directory: 'composition_status'
            },
            {
              id: 'slug',
              label: '短網址',
              type: 'text'
            },
            {
              id: 'type',
              label: '類型',
              type: 'select',
              directory: 'timeline_type'
            },
            {
              id: 'image',
              label: '圖像',
              type: 'text'
            },
            {
              id: 'title',
              label: '標題',
              type: 'text'
            },
            {
              id: 'description',
              label: '敘述',
              type: 'textarea'
            }
          ],
          options: {
            labelWidth: labelWidth(4)
          }
        }
      },
      {
        id: 'events',
        title: '事件',
        description: '這個大事紀中包含的事件',
        interface: {
          type: 'events'
        }
      }
    ]
  },
  figure: {
    api: '/console/comp/figures',
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '這個圖表的基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'status',
              label: '狀態',
              type: 'select',
              directory: 'composition_status'
            },
            {
              id: 'slug',
              label: '短網址',
              type: 'text'
            },
            {
              id: 'type',
              label: '類型',
              type: 'select',
              directory: 'figure_type'
            },
            {
              id: 'image',
              label: '圖像',
              type: 'text'
            },
            {
              id: 'title',
              label: '標題',
              type: 'text'
            },
            {
              id: 'description',
              label: '敘述',
              type: 'textarea'
            },
            {
              id: 'summary',
              label: '摘要',
              type: 'textarea'
            }
          ]
        }
      },
      {
        id: 'data_set',
        title: '資料集',
        description: '這個圖表的資料集',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'data_set_type',
              label: '資料集型別',
              type: 'select',
              directory: 'figure_data_set_type'
            },
            {
              id: 'data_set_id',
              label: '資料集',
              type: 'select'
            }
          ],
          options: {
            labelWidth: labelWidth(6)
          }
        }
      },
      {
        id: 'preview',
        title: '預覽',
        description: '這個圖表的預覽',
        interface: {
          type: 'd3'
        }
      }
    ]
  },
  doc: {
    api: '/console/lab/docs'
  },
  lab_topic_overview: {
    api: '/console/lab/topic_overviews',
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '這個議題綜覽的基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'status',
              label: '狀態',
              type: 'select',
              directory: 'composition_status'
            },
            {
              id: 'slug',
              label: '短網址',
              type: 'text'
            },
            {
              id: 'image',
              label: '圖像',
              type: 'text'
            },
            {
              id: 'st_id',
              label: '關聯小議題',
              type: 'select',
              directory: 'specific_topic'
            },
            {
              id: 'tagline',
              label: '標語',
              type: 'text'
            },
            {
              id: 'title',
              label: '標題',
              type: 'text'
            },
            {
              id: 'intro',
              label: '簡介',
              type: 'textarea'
            },
            {
              id: 'description',
              label: '敘述',
              type: 'textarea'
            }
          ],
          options: {
            labelWidth: labelWidth(6)
          }
        }
      },
      {
        id: 'content',
        title: '內容',
        description: '這個議題綜覽的內容',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'timeline_id',
              label: '大事紀',
              type: 'select',
              directory: 'timeline'
            }
          ],
          options: {
            labelWidth: labelWidth(6)
          }
        }
      },
      {
        id: 'related_links',
        title: '相關連結',
        description: '這個議題綜覽的相關連結',
        interface: {
          type: 'table',
          name: '連結',
          propListIsCalled: 'columns',
          preparerKeyIsAt: 'prop',
          columns: [
            {
              id: 'type',
              prop: 'type',
              label: '類型',
              type: 'select'
            },
            {
              id: 'url',
              prop: 'url',
              label: 'URL',
              type: 'text'
            },
            {
              id: 'title',
              prop: 'title',
              label: '標題',
              type: 'text'
            }
          ]
        }
      }
    ]
  },
  lab_bill_data_set: {
    api: '/console/lab/bill_data_sets',
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '這個提案資料集的基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'name',
              label: '名稱',
              type: 'text'
            },
            {
              id: 'version_no',
              label: '版本號',
              type: 'text'
            },
            {
              id: 'slug',
              label: '短網址',
              type: 'text'
            },
            {
              id: 'term_index',
              label: '屆期',
              type: 'select',
              directory: 'term'
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
            labelWidth: labelWidth(6)
          }
        }
      },
      {
        id: 'data_select',
        title: '資料選擇',
        description: '選擇這個資料集的提案及法案比較',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'st_id',
              label: '關聯小議題',
              type: 'select',
              directory: 'specific_topic',
              cascadeUpdate: [
                cascade.applyConstraint(['act_dir_id', 'act_features'], 'st')
              ]
            },
            {
              id: 'act_id',
              label: '關聯法案',
              type: 'select',
              directory: 'act'
            },
            {
              id: 'act_dir_id',
              label: '關聯修法方向',
              type: 'select',
              directory: 'act_dir'
            },
            {
              id: 'act_feature_ids',
              label: '法案比較',
              type: 'multiselect',
              directory: 'act_feature'
            },
            {
              id: 'bill_ids',
              label: '提案',
              type: 'multiselect',
              directory: 'rs_bill'
            }
          ],
          options: {
            labelWidth: labelWidth(6)
          }
        }
      },
      {
        id: 'scores',
        title: '提案評分',
        description: '針對各項提案在各項法案比較的表現評分',
        interface: {
          type: 'score_board',
          name: '提案比較',
          column_name: 'act_feature_ids',
          column_directory: 'act_feature',
          row_name: 'bill_ids',
          row_directory: 'rs_bill'
        }
      }
    ]
  },
  lab_statement_data_set: {
    api: '/console/lab/statement_data_sets',
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '這個發言資料集的基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'name',
              label: '名稱',
              type: 'text'
            },
            {
              id: 'version_no',
              label: '版本號',
              type: 'text'
            },
            {
              id: 'slug',
              label: '短網址',
              type: 'text'
            },
            {
              id: 'term_index',
              label: '屆期',
              type: 'select',
              directory: 'term',
              cascadeCrossSection: {
                should_have_spoken_condition: ['should_have_spoken_sessions']
              }
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
            labelWidth: labelWidth(6)
          }
        }
      },
      {
        id: 'data_filter',
        title: '資料過濾',
        description: '設定這個資料集資料過濾的條件',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'st_id',
              label: '關聯小議題',
              type: 'select',
              directory: 'specific_topic',
              cascadeUpdate: [
                cascade.applyConstraint(['st_question_id'], 'st')
              ]
            },
            {
              id: 'st_question_id',
              label: '爭點',
              type: 'select',
              directory: 'st_question'
            }
          ],
          options: {
            labelWidth: labelWidth(6)
          }
        }
      },
      {
        id: 'should_have_spoken_condition',
        title: '「應發言」條件',
        description: '設定這個發言資料集的「應發言」條件',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'should_have_spoken_committees',
              label: '委員會',
              type: 'multiselect',
              directory: 'committee'
            },
            {
              id: 'should_have_spoken_sessions',
              label: '會期',
              type: 'multiselect',
              directory: 'session',
              disabled: true,
              cascadeAction: {
                keyName: 'sessions',
                labelName: 'session_index',
                valueName: 'session_index'
              }
            }
          ],
          options: {
            labelWidth: labelWidth(4)
          }
        }
      }
    ]
  },
  lab_data_report: {
    api: '/console/lab/data_reports',
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '這個數據分析報告的基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'status',
              label: '狀態',
              type: 'select',
              directory: 'composition_status'
            },
            {
              id: 'slug',
              label: '短網址',
              type: 'text'
            },
            {
              id: 'type',
              label: '類別',
              type: 'select',
              directory: 'lab_data_report_type'
            },
            {
              id: 'image',
              label: '圖像',
              type: 'text'
            },
            {
              id: 'title',
              label: '標題',
              type: 'text'
            },
            {
              id: 'st_id',
              label: '關聯小議題',
              type: 'select',
              directory: 'specific_topic'
            },
            {
              id: 'figure_data_set_type',
              label: '圖表資料集型別',
              type: 'select',
              directory: 'figure_data_set_type',
              cascadeUpdate: [
                cascade.appointDirectory(['figure_data_set_id'])
              ]
            },
            {
              id: 'figure_data_set_id',
              label: '圖表資料集',
              type: 'select'
            }
          ],
          options: {
            labelWidth: labelWidth(7)
          }
        }
      },
      {
        id: 'figures',
        title: '圖表',
        description: '這個數據分析報告的圖表',
        interface: {
          type: 'table',
          name: '圖表',
          propListIsCalled: 'columns',
          preparerKeyIsAt: 'prop',
          columns: [
            {
              id: 'figure_id',
              prop: 'id',
              label: '圖表',
              type: 'select',
              directory: 'figure'
            },
            {
              id: 'index',
              prop: 'index',
              label: '排序',
              type: 'number'
            }
          ]
        }
      }
    ]
  },
  lab_insight: {
    api: '/console/lab/insights',
    sections: [
      {
        id: 'base',
        title: '基本資料',
        description: '這個分析評論的基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'status',
              label: '狀態',
              type: 'select',
              directory: 'composition_status'
            },
            {
              id: 'slug',
              label: '短網址',
              type: 'text'
            },
            {
              id: 'image',
              label: '圖像',
              type: 'text'
            },
            {
              id: 'title',
              label: '標題',
              type: 'text'
            },
            {
              id: 'st_id',
              label: '關聯小議題',
              type: 'select',
              directory: 'specific_topic'
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
