<template>
<div class="editor">
  {{ $route.fullPath }}
  <section v-for="section in sections" :key="section.title">
    <div class="title"><h3>{{ section.title }}</h3></div>
    <p>{{ section.description }}</p>
    <editor-form v-if="section.interface.type == 'form'" :fields="section.interface.fields"></editor-form>
    <editor-table v-if="section.interface.type == 'table'" :title="section.title" :columns="section.interface.columns"></editor-table>
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

export default {
  props: ['page'],
  data() {
    return {
      sections: []
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
      let [prefix, editorID] = this.page.id.split('-')
      if(prefix === 'editor' && editors[editorID]) {
        this.sections = editors[editorID].sections.map(section => {
          if(section.interface.type === 'checklist') {
            section.interface = Object.assign(section.interface, editorChecklists[section.interface.id])
          }
          return section
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

<style>
.editor {
  margin: 0;
}
</style>
