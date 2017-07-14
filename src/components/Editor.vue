<template>
<div class="editor">
  <div class="title"><h1 class="small">{{ page.routes.edit.title }}</h1></div>
  <section v-for="section in sections" :key="section.title" v-if="shouldSectionRender(section)">
    <div class="title"><h2 class="small">{{ section.title }}</h2></div>
    <p>{{ section.description }}</p>
    <editor-form v-if="sectionIs(section, 'form')" :config="section.interface" :model="model" :page="page"></editor-form>
    <editor-table v-if="sectionIs(section, 'table')" :config="section.interface" :rows="model[section.id]" :page="page" :isInitialized="isInitialized"></editor-table>
    <editor-checklist v-if="sectionIs(section, 'checklist')" :config="section.interface" :model.sync="model[section.id]" :page="page"></editor-checklist>
  </section>
  <el-button @click="submit()" type="primary">儲存</el-button>
  <el-button @click="goBack()">取消</el-button>
</div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import editors from '@/config/editors'
import editorChecklists from '@/config/editorChecklists'
import EditorForm from '@/components/EditorForm'
import EditorTable from '@/components/EditorTable'
import EditorChecklist from '@/components/EditorChecklist'

Vue.use(Vuex)

export default {
  props: ['page'],
  data() {
    return {
      isInitialized: false,
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
    sectionIs(section, type) {
      return section.interface.type === type
    },
    shouldSectionRender(section) {
      if(section.condition) {
        var result = true
        for(let key in section.condition) {
          let requiredValue = section.condition[key]
          result = result && (this.model[key] === requiredValue)
        }
        return result
      }
      return true
    },
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
          if(section.id === 'base') {
            for(let field of section.interface.fields) {
              this.$set(this.model, field.id, undefined)
            }
          } else {
            this.$set(this.model, section.id, [])
          }
        }
        this.isInitialized = true
      } else {
        // this is temporary until /list/:id is ready
        let path = this.$route.fullPath.split('/')
        axios.get('https://c0re.watchout.tw/console/lab/' + path[1]).then(response => {
          this.model = response.data.rows[key]
          this.isInitialized = true
        })
      }
    },
    goBack() {
      this.$router.push({name: this.page.routes.list.name})
    },
    submit() {
      this.$store.dispatch('submitForm', this.model)
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
  > section {
    > .title {
      margin: 0.5rem 0;
    }
  }
}

.el-date-editor.el-input {
  width: 160px;

  &.el-input--small {
    width: 128px;
  }
}
.el-input-number {
  width: 160px;

  &.el-input-number--small {
    width: 100px;
  }
}
.el-table .cell, .el-table th>div {
  padding-left: 10px;
  padding-right: 10px;
}

</style>
