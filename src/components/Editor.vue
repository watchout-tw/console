<template>
<div class="editor">
  {{ $route.params.id }}
  <section v-for="section in sections" :key="section.title">
    <h3>{{ section.title }}</h3>
    <p>{{ section.description }}</p>
    <p>{{ section.interface.type }}</p>
    <editor-form v-if="section.interface.type == 'form'" :fields="section.interface.fields"></editor-form>
    <editor-table v-if="section.interface.type == 'table'" :title="section.title" :columns="section.interface.columns"></editor-table>
    <editor-checkbox-group v-if="section.interface.type == 'checkbox-group'" :source="section.interface.source"></editor-checkbox-group>
  </section>
</div>
</template>

<script>
import EditorForm from '@/components/EditorForm'
import EditorTable from '@/components/EditorTable'
import EditorCheckboxGroup from '@/components/EditorCheckboxGroup'

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
              id: 'term',
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
        title: '政黨',
        description: '這個屆期所有有席次的政黨',
        interface: {
          type: 'checkbox-group',
          source: {
            id: 'party',
            api: 'parties'
          }
        }
      },
      {
        title: '黨團、政團',
        description: '這個屆期所有有席次的黨團、政團',
        interface: {
          type: 'checkbox-group',
          source: {
            id: 'caucus',
            api: 'caucuses'
          }
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
  },
  components: {
    EditorForm,
    EditorTable,
    EditorCheckboxGroup
  }
}
</script>

<style>
.editor {
  margin: 0;
}
</style>
