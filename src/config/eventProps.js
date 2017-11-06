export default {
  status: {
    id: 'status',
    label: '狀態',
    type: 'select',
    directory: 'composition_status'
  },
  slug: {
    id: 'slug',
    label: '短網址',
    type: 'text'
  },
  date: {
    id: 'date',
    label: '日期',
    type: 'date'
  },
  type: {
    id: 'type',
    label: '類型',
    type: 'select',
    directory: 'timeline_event_type'
  },
  image: {
    id: 'image',
    label: '圖像',
    type: 'text'
  },
  tagline: {
    id: 'tagline',
    label: '標語',
    type: 'text'
  },
  title: {
    id: 'title',
    label: '標題',
    type: 'text'
  },
  content: {
    id: 'content',
    label: '內容',
    type: 'textarea'
  },
  link: {
    id: 'link',
    label: '連結',
    type: 'text'
  },
  data: {
    id: 'data',
    label: '資料',
    type: 'textarea'
  },
  term_index: {
    id: 'term_index',
    label: '屆期',
    type: 'number'
  },
  session_index: {
    id: 'session_index',
    label: '會期',
    type: 'number'
  },
  temp_session_index: {
    id: 'temp_session_index',
    label: '臨時會期',
    type: 'number'
  },
  reps: {
    id: 'rep',
    label: '就職立委',
    type: 'multiselect',
    directory: 'rep'
  },
  rs_votes: {
    id: 'rs_vote',
    label: '表決',
    type: 'multiselect',
    directory: 'rs_vote'
  },
  data_reports: {
    id: 'data_report',
    label: '數據分析報告',
    type: 'multiselect',
    directory: 'data_report'
  },
  insights: {
    id: 'insight',
    label: '分析評論',
    type: 'multiselect',
    directory: 'insight'
  }
}
