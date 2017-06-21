<template>
<div class="editor">
  {{ $route.params.id }}
  <section v-for="section in sections" :key="section.title">
    <h3>{{ section.title }}</h3>
    <p>{{ section.description }}</p>
  </section>
</div>
</template>

<script>
var editors = {
  'term-editor': {
    sections: [
      {
        title: '屆期',
        description: '這個屆期的基本資料',
        interface: {
          type: 'form',
          fields: [
            {
              label: '屆期',
              type: 'input'
            },
            {
              label: '起始日',
              type: 'date'
            },
            {
              label: '終止日',
              type: 'date'
            }
          ]
        }
      },
      {
        title: '會期',
        description: '這個屆期的所有會期、臨時會會期',
        interface: {
          type: 'table',
          columns: [
            {
              prop: 'session_index',
              label: '會期'
            },
            {
              prop: 'temp_session_index',
              label: '臨時會期'
            },
            {
              prop: 'start_date',
              label: '起'
            },
            {
              prop: 'end_date',
              label: '訖'
            }
          ]
        }
      },
      {
        title: '政黨',
        description: '這個屆期所有有席次的政黨',
        interface: {
          type: 'checkbox-group'
        }
      },
      {
        title: '黨團、政團',
        description: '這個屆期所有有席次的黨團、政團',
        interface: {
          type: 'checkbox-group'
        }
      }
    ]
  }
}

export default {
  props: ['page'],
  data() {
    return {
      sections: []
    }
  },
  mounted() {
    console.log('editor:', this.page.id)
    this.update()
  },
  watch: {
    'page.id'() { // watch page.id to detect switching between pages
      this.update()
    },
    'paging.page'() {
      this.update()
    }
  },
  methods: {
    update() {
      console.log(this.page)
      if(editors[this.page.id]) {
        this.sections = editors[this.page.id].sections
      }
    }
  }
}
</script>
