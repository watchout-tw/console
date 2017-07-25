<template>
<div class="editor-form">
  <el-form :label-width="config.options.labelWidth" label-position="left">
    <el-form-item v-for="field in config.fields" :key="field.id" :label="field.label" :class="formItemClasses(field)">
      <el-input v-if="fieldIs(field, 'text')" v-model="model[field.id]"></el-input>
      <el-input v-if="fieldIs(field, 'textarea')" type="textarea" v-model="model[field.id]"></el-input>
      <el-input-number v-if="fieldIs(field, 'number')" v-model="model[field.id]"></el-input-number>
      <!--<el-date-picker v-if="fieldIs(field, 'date')" v-model="model[field.id]"></el-date-picker>-->
      <el-switch v-if="fieldIs(field, 'switch')" v-model="model[field.id]" on-text="YES" off-text="NO"></el-switch>
      <el-color-picker v-if="fieldIs(field, 'color')" v-model="model[field.id]" show-alpha></el-color-picker>
      <term-lookup v-if="fieldIs(field, 'date')" :value.sync="model[field.id]" :uuid="uuids[field.id]" :cascade-this.sync="cascadeThis" :config="field" :page="page"></term-lookup>
      <abstract-select v-if="fieldIs(field, 'select')" :value.sync="model[field.id]" :uuid="uuids[field.id]" :cascade-this.sync="cascadeThis" :config="field" :page="page"></abstract-select>
      <abstract-multi-select v-if="fieldIs(field, 'multiselect')" :value.sync="model[field.id]" :uuid="uuids[field.id]" :config="field" :page="page"></abstract-multi-select>
      <gender-slider v-if="fieldIs(field, 'gender')" :value.sync="model[field.id]" :config="field" :page="page"></gender-slider>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import uuid from 'uuid/v4'
import AbstractSelect from '@/components/AbstractSelect'
import AbstractMultiSelect from '@/components/AbstractMultiSelect'
import TermLookup from '@/components/TermLookup'
import GenderSlider from '@/components/GenderSlider'
import * as cascadeTypes from '@/util/cascade-types'

export default {
  props: ['model', 'config', 'page'],
  data() {
    return {
      uuids: {},
      cascadeVectors: {},
      cascadeThis: {}
    }
  },
  beforeMount() {
    this.update()
  },
  watch: {
    'cascadeThis'() {
      this.cascade()
    }
  },
  methods: {
    fieldIs(field, type) {
      return field.type.split('-').shift() === type
    },
    formItemClasses(field) {
      var classes = []
      if(field.determined_by) {
        classes.push('has-dependency')
      }
      return classes
    },
    update() {
      // set UUIDs
      for(let field of this.config.fields) {
        this.$set(this.uuids, field.id, uuid())
      }

      // prepare cascadeVectors
      this.cascadeVectors = {} // need to reset during development?
      this.config.fields.forEach(field => {
        if(field.cascadeUpdate) {
          let fieldUUID = this.uuids[field.id]
          if(!this.cascadeVectors[fieldUUID]) {
            this.$set(this.cascadeVectors, fieldUUID, [])
          }
          this.cascadeVectors[fieldUUID].push(
            ...field.cascadeUpdate.map(vector => {
              return Object.assign(vector, {
                targets: vector.targets.map(target => {
                  return {
                    id: target,
                    uuid: this.uuids[target]
                  }
                })
              }) // this updates config.cascadeUpdate of children element as well
            })
          )
        }
      })
    },
    cascade() {
      console.log('EditorForm.cascade()')
      let vectors = this.cascadeVectors[this.cascadeThis.fromID]
      if(vectors) {
        vectors.forEach(vector => {
          if(vector.action === cascadeTypes.LOOKUP_TERM) {
            vector.targets.forEach(target => {
              let value = this.cascadeThis.value
              if(target.id === 'term_index') {
                this.model.term_index = value ? value.term_index : undefined
              } else if(target.id === 'session_index') {
                this.config.fields.forEach(field => {
                  if(field.id === 'session_index') {
                    if(value) {
                      this.$set(field, 'parameters', {
                        term: value.term_index
                      })
                    } else {
                      this.$delete(field.parameters, 'term')
                    }
                  }
                })
                this.model.session_index = value ? value.session_index : undefined
              } else if(target.id === 'temp_session_index') {
                this.model.temp_session_index = value ? value.temp_session_index : undefined
              }
            })
          }
        })
      }
    }
  },
  components: {
    AbstractSelect,
    AbstractMultiSelect,
    TermLookup,
    GenderSlider
  }
}
</script>

<style lang="scss">
.editor-form {
  .el-form-item.has-dependency {
    position: relative;

    &:before {
      $font-size: 1rem;
      content: '↳';
      display: block;
      position: absolute;
      top: -$font-size/2;
      left: 0;
      font-size: $font-size;
      line-height: 1;
      height: $font-size;
      opacity: 0.5;
    }
  }
}
</style>
