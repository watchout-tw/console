<template>
<div class="editor">
  <div class="title"><h1 class="small">{{ page.routes.edit.title }}</h1></div>
  <section v-for="section in sections" :key="section.title" v-if="shouldSectionRender(section)">
    <div class="title"><h2 class="small">{{ section.title }}</h2></div>
    <p>{{ section.description }}</p>
    <editor-form v-if="sectionIs(section, 'form')" :config="section.interface" :model="model" :page="page"></editor-form>
    <editor-table v-else-if="sectionIs(section, 'table')" :config="section.interface" :rows.sync="model[section.id]" :page="page" :parentInitialized="initialized"></editor-table>
    <editor-checklist v-else-if="sectionIs(section, 'checklist')" :config="section.interface" :model.sync="model[section.id]" :page="page"></editor-checklist>
    <editor-events v-else-if="sectionIs(section, 'events')" :config="section.interface" :events.sync="model[section.id]" :page="page" :parentInitialized="initialized"></editor-events>
    <editor-score-board v-else-if="sectionIs(section, 'score_board')" :config="section.interface" :scores.sync="model[section.id]" :columnIds="model[section.interface.column_name]" :rowIds="model[section.interface.row_name]"></editor-score-board>
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
import EditorEvents from '@/components/EditorEvents'
import EditorScoreBoard from '@/components/EditorScoreBoard'
import * as clone from '@/util/clone'

Vue.use(Vuex)

function scrollToTop() {
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

const SITE_TITLE = '→沃草←中控室'

export default {
  metaInfo() {
    return {
      title: this.page.routes.edit.title + SITE_TITLE
    }
  },
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
      this.sections = editors[this.page.editor].sections

      // try to get data and bind to editor
      if(this.$route.params.id === 'create') {
        for(let section of this.sections) {
          if(section.interface.type === 'form') {
            for(let field of section.interface.fields) {
              this.$set(this.model, field.id, field.defaultValue) // if field.defaultValue is not defined then it is undefined
            }
          } else {
            this.$set(this.model, section.id, []) // FIXME: assuming everything else other than form is array
          }
        }
        this.initialized = true
      } else {
        api.getItem({
          pageID: this.page.id,
          id: this.$route.params.id
        }).then(response => {
          this.model = response.data
          // put data through transformer
          for(let section of this.sections) {
            if(section.interface.type === 'form') {
              for(let field of section.interface.fields) {
                if(field.getTransformer && this.model.hasOwnProperty(field.id)) {
                  this.model[field.id] = field.getTransformer(this.model[field.id])
                }
              }
            } else if(['table', 'events'].findIndex(type => type === section.interface.type) > -1) {
              const propListKey = section.interface.propListIsCalled
              const preparerKey = section.interface.preparerKeyIsAt

              var arrayToTransform = this.model[section.id]
              if(arrayToTransform) {
                for(let obj of arrayToTransform) {
                  for(let propObj of section.interface[propListKey]) {
                    if(propObj.getTransformer) {
                      const key = propObj[preparerKey]
                      obj[key] = propObj.getTransformer(obj[key])
                    }
                  }
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
      var tempModel = clone.deepClone(this.model)
      for(let section of this.sections) {
        if(section.interface.type === 'form') {
          for(let field of section.interface.fields) {
            if(field.postPreparer && tempModel.hasOwnProperty(field.id)) {
              tempModel[field.id] = field.postPreparer(tempModel[field.id])
            }
          }
        } else if(section.interface.type === 'checklist') {
          if(section.interface.postPreparer && tempModel.hasOwnProperty(section.id)) {
            tempModel[section.id] = section.interface.postPreparer(tempModel[section.id])
          }
        } else if(['table', 'events'].findIndex(type => type === section.interface.type) > -1 && tempModel[section.id]) {
          const propListKey = section.interface.propListIsCalled
          const preparerKey = section.interface.preparerKeyIsAt

          var arrayToPrepare = tempModel[section.id]
          for(let obj of arrayToPrepare) {
            for(let propObj of section.interface[propListKey]) {
              const key = propObj[preparerKey]
              if(propObj.deleteThisBeforePost) {
                delete obj[key]
              } else if(propObj.postPreparer) {
                obj[key] = propObj.postPreparer(obj[key])
              }
            }
          }
        }
      }
      if(!tempModel.id && (this.$route.params.id && this.$route.params.id !== 'create')) {
        tempModel.id = this.$route.params.id
      }
      return tempModel
    },
    submit() {
      let content = this.prepare()
      console.log('Payload:', content)
      if (this.$route.params.id === 'create') {
        this.$store.dispatch('submitForm', {
          content: content,
          page: this.page,
          pageID: this.page.id
        })
      } else {
        this.$store.dispatch('patchForm', {
          content: content,
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
    EditorChecklist,
    EditorEvents,
    EditorScoreBoard
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

// override element
.el-textarea__inner {
  padding: 5px 10px;
}
.el-form-item {
  margin-bottom: 1rem;
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
</style>
