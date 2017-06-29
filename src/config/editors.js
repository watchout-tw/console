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
          ]
        }
      },
      {
        id: 'sessions',
        title: '會期',
        description: '這個屆期的所有會期、臨時會會期',
        interface: {
          type: 'table',
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
        description: '這個屆期所有有席次的政黨',
        interface: {
          type: 'checklist',
          id: 'party'
        }
      },
      {
        id: 'caucuses',
        title: '黨團、政團',
        description: '這個屆期所有有席次的黨團、政團',
        interface: {
          type: 'checklist',
          id: 'caucus'
        }
      }
    ]
  },
  term_district: {
    sections: [
      {
        id: 'base',
        title: '選區',
        description: '屆期選區基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              id: 'index',
              label: '屆期',
              type: 'number'
            }
          ]
        }
      }
    ]
  }
}
