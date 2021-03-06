<template>
<div class="editor">
  <div class="error">{{ errorMsg }}</div>
  <div class="title"><h1 class="small">{{ page.routes.edit.title }}</h1></div>
  <section v-for="section in sections" :key="section.title" v-if="shouldSectionRender(section)">
    <div class="title"><h2 class="small">{{ section.title }}</h2></div>
    <p>{{ section.description }}</p>
    <editor-form v-if="sectionIs(section, 'form') && !isReference(section)" :sectionId="section.id" :config="section.interface" :model="model" :page="page"></editor-form>
    <editor-form v-if="sectionIs(section, 'form') && isReference(section)" :sectionId="section.id" :config="section.interface" :model.sync="model['data']" :page="page"></editor-form>
    <editor-table v-else-if="sectionIs(section, 'table')" :sectionId="section.id" :config="section.interface" :rows.sync="model[section.id]" :page="page" :parentInitialized="initialized"></editor-table>
    <editor-checklist v-else-if="sectionIs(section, 'checklist')" :config="section.interface" :model.sync="model[section.id]" :page="page"></editor-checklist>
    <editor-events v-else-if="sectionIs(section, 'events')" :config="section.interface" :events.sync="model[section.id]" :page="page" :parentInitialized="initialized"></editor-events>
    <editor-score-board v-else-if="sectionIs(section, 'score_board')" :config="section.interface" :scores.sync="model[section.id]" :columnIds="model[section.interface.column_name]" :rowIds="model[section.interface.row_name]"></editor-score-board>
  </section>
  <el-button @click="submit()" :disabled="lockSave" type="primary">儲存</el-button>
  <el-button @click="goBack()">取消</el-button>
  <el-button v-if="isDeleteable" @click="remove()" :disabled="lockSave" type="danger" class="remove">刪除</el-button>
</div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import editors from '@/config/editors'
import EditorForm from '@/components/EditorForm'
import EditorTable from '@/components/EditorTable'
import EditorChecklist from '@/components/EditorChecklist'
import EditorScoreBoard from '@/components/EditorScoreBoard'
import errorMsgService from '@/interfaces/errorMsgService'
import * as api from '@/util/api'
import * as clone from '@/util/clone'
import * as sanitizer from '@/util/sanitizer'

Vue.use(Vuex)

function scrollToTop() {
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

const SITE_TITLE = '→沃草←中控室'
const messages = {
  failure: '編輯失敗',
  success: '編輯成功',
  confirmDelete: '刪錯了就要拜偷工程師幫你救回來了，真的要刪嗎？'
}

export default {
  mixins: [errorMsgService],
  props: ['page'],
  metaInfo() {
    return {
      title: this.page.routes.edit.title + SITE_TITLE
    }
  },
  data() {
    return {
      initialized: false,
      sections: [],
      model: {},
      lockSave: false
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
  computed: {
    isDeleteable () {
      return editors[this.page.editor].deletable
    }
  },
  methods: {
    sectionIs(section, type) {
      return section.interface.type === type
    },
    isReference(section) {
      return section.interface.is_reference
    },
    shouldSectionRender(section) {
      if(section.condition) {
        var result = true
        for(let key in section.condition) {
          let requiredValue = section.condition[key]
          result = result && (this.model[key] === requiredValue)
        }
        // for timeline event: create property for model.data while doing conditional rendering
        if(result && section.interface.is_reference) {
          for(let field of section.interface.fields) {
            if(!this.model.data.hasOwnProperty(field.id)) {
              this.$set(this.model.data, field.id, field.defaultValue)
            }
          }
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
            // now only for event data
            if(section.interface.is_reference) {
              this.$set(this.model, 'data', {})
            } else {
              for(let field of section.interface.fields) {
                this.$set(this.model, field.id, field.defaultValue) // if field.defaultValue is not defined then it is undefined
              }
            }
          } else {
            this.$set(this.model, section.id, []) // FIXME: assuming everything else other than form is array
          }
        }
        this.initialized = true
      } else {
        api.getItem({
          api: editors[this.page.editor].api,
          id: this.$route.params.id
        }).then(response => {
          this.model = response.data
          // put data through transformer
          for(let section of this.sections) {
            if(section.interface.type === 'form') {
              if(section.interface.is_reference) {
                for(let field of section.interface.fields) {
                  if(field.getTransformer && this.model.data && this.model.data.hasOwnProperty(field.id)) {
                    this.model.data[field.id] = field.getTransformer(this.model.data[field.id])
                  }
                }
              } else {
                for(let field of section.interface.fields) {
                  if(field.getTransformer && this.model.hasOwnProperty(field.id)) {
                    this.model[field.id] = field.getTransformer(this.model[field.id])
                  }
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
      var newModel = {}
      newModel.id = this.model.id
      for(let section of this.sections) {
        if(section.interface.type === 'form') {
          for(let field of section.interface.fields) {
            if(section.interface.is_reference && !this.model[field.id]) {
              continue
            }
            newModel[field.id] = sanitizer.cleanField(this.model[field.id])
            if(field.postPreparer && this.model.hasOwnProperty(field.id)) {
              newModel[field.id] = field.postPreparer(this.model[field.id])
            }
            if(field.allowNull && this.model.hasOwnProperty(field.id) && !this.model[field.id]) {
              delete newModel[field.id]
            }
          }
        } else if(section.interface.type === 'checklist') {
          if(section.interface.postPreparer && this.model.hasOwnProperty(section.id)) {
            newModel[section.id] = section.interface.postPreparer(this.model[section.id])
          }
        } else if(['table', 'events'].findIndex(type => type === section.interface.type) > -1 && this.model[section.id]) {
          const propListKey = section.interface.propListIsCalled
          const preparerKey = section.interface.preparerKeyIsAt

          var arrayToPrepare = clone.deepClone(this.model[section.id])
          for(let obj of arrayToPrepare) {
            for(let propObj of section.interface[propListKey]) {
              const key = propObj[preparerKey]
              obj[key] = sanitizer.cleanField(obj[key])
              if(propObj.deleteThisBeforePost) {
                delete obj[key]
              } else if(propObj.postPreparer) {
                obj[key] = propObj.postPreparer(obj[key])
              }
            }
          }
          newModel[section.id] = arrayToPrepare
        } else if(section.interface.type === 'score_board') {
          newModel[section.id] = this.model[section.id]
        }
        // ***dirty hack: 在把有 is_reference 的資料送出去前，把 model.data 裡的 null 給清乾淨
        if(section.interface.is_reference && this.model.type) {
          if(this.model.type === section.id) {
            var newData = {}
            for(let field of section.interface.fields) {
              newData[field.id] = this.model.data[field.id]
            }
            newModel.data = newData
          }
        }
      }
      if(!this.model.id && (this.$route.params.id && this.$route.params.id !== 'create')) {
        newModel.id = this.$route.params.id
      }
      return newModel
    },
    submit() {
      this.lockSave = true
      let content = this.prepare()
      console.log('Payload:', content)
      if (this.$route.params.id === 'create') {
        api.postForm({
          content: content,
          page: this.page,
          api: editors[this.page.editor].api
        }).then(response => {
          this.$router.push({name: this.page.routes.edit.name, params: {id: response.data[this.page.routingIndex]}})
          this.$message({
            message: messages.success,
            type: 'success'
          })
          this.hideError()
          this.lockSave = false
        }).catch(error => {
          this.$message({
            message: messages.failure,
            type: 'error'
          })
          this.showError(error)
          console.error(error)
          this.lockSave = false
        })
      } else {
        api.patchForm({
          content: content,
          page: this.page,
          api: editors[this.page.editor].api
        }).then(response => {
          this.$router.push({name: this.page.routes.edit.name, params: {id: response.data[this.page.routingIndex]}})
          this.$message({
            message: messages.success,
            type: 'success'
          })
          this.hideError()
          this.lockSave = false
        }).catch(error => {
          this.$message({
            message: messages.failure,
            type: 'error'
          })
          this.showError(error)
          console.error(error)
          this.lockSave = false
        })
      }
      scrollToTop()
    },
    remove () {
      if (confirm(messages.confirmDelete)) {
        api.deleteItem({
          api: editors[this.page.editor].api,
          id: this.$route.params.id
        }).then(response => {
          this.$router.push({name: this.page.routes.list.name})
          this.$message({
            message: messages.success,
            type: 'success'
          })
        })
      }
    }
  },
  components: {
    EditorForm,
    EditorTable,
    EditorChecklist,
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
  > .remove {
    position: absolute;
    right: 1rem;
  }
}

// ElementIO override
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
.error {
  color: red;
}
</style>
