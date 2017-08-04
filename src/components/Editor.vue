<template>
<div class="editor">
  <div class="title"><h1 class="small">{{ page.routes.edit.title }}</h1></div>
  <section v-for="section in sections" :key="section.title" v-if="shouldSectionRender(section)">
    <div class="title"><h2 class="small">{{ section.title }}</h2></div>
    <p>{{ section.description }}</p>
    <editor-form v-if="sectionIs(section, 'form')" :config="section.interface" :model="model" :page="page"></editor-form>
    <editor-table v-if="sectionIs(section, 'table')" :config="section.interface" :rows.sync="model[section.id]" :page="page" :parentInitialized="initialized"></editor-table>
    <editor-checklist v-if="sectionIs(section, 'checklist')" :config="section.interface" :model.sync="model[section.id]" :page="page"></editor-checklist>
  </section>
  <el-button @click="submit()" type="primary">儲存</el-button>
  <el-button @click="goBack()">取消</el-button>
</div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '@/util/api'
import editors from '@/config/editors'
import EditorForm from '@/components/EditorForm'
import EditorTable from '@/components/EditorTable'
import EditorChecklist from '@/components/EditorChecklist'

Vue.use(Vuex)

function scrollToTop() {
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

export default {
  props: ['page'],
  data() {
    return {
      initialized: false,
      sections: [],
      model: {}
    }
  },
  beforeMount() {
    this.update()
  },
  watch: {
    '$route'(to, from) {
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
      this.sections = editors[this.page.editor].sections

      // try to get data and bind to editor
      if(this.$route.params.id === 'create') {
        for(let section of this.sections) {
          if(section.interface.type === 'form') {
            for(let field of section.interface.fields) {
              this.$set(this.model, field.id, field.defaultValue) // if field.defaultValue is not defined then it is undefined
            }
          } else {
            this.$set(this.model, section.id, [])
          }
        }
        this.initialized = true
      } else {
        api.getItem({
          pageID: this.page.id,
          id: this.$route.params.id
        }).then(response => {
          this.model = response.data
          // format certain property before render
          for(let section of this.sections) {
            if(section.interface.type === 'form') {
              for(let field of section.interface.fields) {
                if (field.formatter && this.model[field.id]) {
                  this.model[field.id] = field.formatter(this.model[field.id])
                }
              }
            }
          }
          this.initialized = true
        })
      }
    },
    goBack() {
      this.$router.push({name: this.page.routes.list.name})
    },
    prepare() {
      // prepare post body before actually post
      for(let section of this.sections) {
        if(section.interface.type === 'form') {
          for(let field of section.interface.fields) {
            if (field.postPreparer && this.model[field.id]) {
              this.model[field.id] = field.postPreparer(this.model[field.id])
            }
          }
        } else if (section.interface.type === 'checklist') {
          if (section.interface.postPreparer && this.model[section.id]) {
            this.model[section.id] = section.interface.postPreparer(this.model[section.id])
          }
        }
      }
    },
    submit() {
      this.prepare()
      if (this.$route.params.id === 'create') {
        this.$store.dispatch('submitForm', {
          content: this.model,
          page: this.page,
          pageID: this.page.id
        })
      } else {
        this.$store.dispatch('patchForm', {
          content: this.model,
          page: this.page,
          pageID: this.page.id
        })
      }
      scrollToTop()
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
.el-table .cell, .el-table th > div {
  padding-left: 10px;
  padding-right: 10px;
}

.el-tag .el-icon-close {
  padding: 2px;
  font-size: 10px;
  line-height: 14px;
}

.abstract-multi-select > .el-select {
  width: 100%;
}

</style>
