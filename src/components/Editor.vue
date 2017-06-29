<template>
<div class="editor">
  <div class="title"><h1 class="small">{{ page.routes.edit.title }}</h1></div>
  <section v-for="section in sections" :key="section.title">
    <div class="title"><h2 class="small">{{ section.title }}</h2></div>
    <p>{{ section.description }}</p>
    <editor-form v-if="section.interface.type == 'form'" :fields="section.interface.fields" :model="model"></editor-form>
    <editor-table v-if="section.interface.type == 'table'" :title="section.title" :columns="section.interface.columns" :rows="model[section.id]"></editor-table>
    <editor-checklist v-if="section.interface.type == 'checklist'" :page="page" :interface="section.interface"></editor-checklist>
  </section>
  <el-button type="primary">儲存</el-button>
  <el-button>取消</el-button>
</div>
</template>

<script>
import editors from '@/config/editors'
import editorChecklists from '@/config/editorChecklists'
import EditorForm from '@/components/EditorForm'
import EditorTable from '@/components/EditorTable'
import EditorChecklist from '@/components/EditorChecklist'

import axios from 'axios'

export default {
  props: ['page'],
  data() {
    return {
      sections: [],
      model: {}
    }
  },
  mounted() {
    this.update()
  },
  watch: {
    'page.id'() { // watch page.id to detect switching between pages
      this.update()
    }
  },
  methods: {
    update() {
      console.log('Editor:', this.page.id)
      this.sections = editors[this.page.editor].sections.map(section => {
        if(section.interface.type === 'checklist') {
          section.interface = Object.assign(section.interface, editorChecklists[section.interface.id])
        }
        return section
      })

      // try to get data and bind to editor
      let key = this.$route.params.id
      if(key === 'create') {
        for(let section of this.sections) {
          console.log(section.id)
          if(section.id === 'base') {
            for(let field of section.interface.fields) {
              this.$set(this.model, field.id, undefined)
            }
          } else {
            this.$set(this.model, section.id, [])
          }
        }
      } else {
        let path = this.$route.fullPath.split('/')
        axios.get('https://c0re.watchout.tw/console/lab/' + path[1]).then(response => {
          this.model = response.data.rows[key - 1]
        })
      }
    }
  },
  components: {
    EditorForm,
    EditorTable,
    EditorChecklist
  }
}
</script>

<style lang="scss">
.editor {
  margin: 1rem;
  > .title {
    margin: 1rem 0;
  }
}
</style>
