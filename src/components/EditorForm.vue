<template>
<div class="editor-form">
  <el-form :label-width="labelWidth" label-position="left">
    <el-form-item v-for="field in config.fields" :key="field.id" :label="field.label" :class="formItemClasses(field)">
      <el-input v-if="fieldIs(field, 'text')" v-model="model[field.id]" :disabled="fieldIsDisabled(field)" :placeholder="field.label"></el-input>
      <el-input v-if="fieldIs(field, 'textarea')" type="textarea" v-model="model[field.id]" :disabled="fieldIsDisabled(field)" :placeholder="field.label"></el-input>
      <el-input-number v-if="fieldIs(field, 'number')" v-model="model[field.id]" :disabled="fieldIsDisabled(field)"></el-input-number>
      <el-switch v-if="fieldIs(field, 'switch')" v-model="model[field.id]" on-text="YES" off-text="NO" :disabled="fieldIsDisabled(field)"></el-switch>
      <term-lookup v-if="fieldIs(field, 'date')" :value.sync="model[field.id]" :cascadeConfig="cascadeMap[0][field.id]" :queueCascadeUpdate="queueCascadeUpdate" :config="field" :page="page"></term-lookup>
      <abstract-select v-if="fieldIs(field, 'select')" :value.sync="model[field.id]" :cascadeConfig="cascadeMap[0][field.id]" :queueCascadeUpdate="queueCascadeUpdate" :config="field" :page="page"></abstract-select>
      <abstract-multi-select v-if="fieldIs(field, 'multiselect')" :value.sync="model[field.id]" :cascadeConfig="cascadeMap[0][field.id]" :queueCascadeUpdate="queueCascadeUpdate" :config="field" :page="page"></abstract-multi-select>
      <abstract-color-picker v-if="fieldIs(field, 'color')" :value.sync="model[field.id]"></abstract-color-picker>
      <gender-slider v-if="fieldIs(field, 'gender')" :value.sync="model[field.id]" :config="field" :page="page"></gender-slider>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import AbstractSelect from '@/components/AbstractSelect'
import AbstractMultiSelect from '@/components/AbstractMultiSelect'
import AbstractColorPicker from '@/components/AbstractColorPicker'
import TermLookup from '@/components/TermLookup'
import GenderSlider from '@/components/GenderSlider'
import cascadeController from '@/interfaces/cascadeController'
import { labelWidth } from '@/util/element'
import { mapGetters } from 'vuex'

export default {
  mixins: [cascadeController],
  props: ['model', 'config', 'page', 'sectionId'],
  computed: {
    labelWidth() {
      return this.config.options ? this.config.options.labelWidth : labelWidth(4)
    },
    ...mapGetters({
      cascadeQue: 'cascadeQue'
    })
  },
  beforeMount() {
    this.init()
  },
  watch: {
    // 'cascadeQue'() {}
    // TODO if need, general method of cascade
  },
  methods: {
    fieldIs(field, type) {
      return field.type.split('-').shift() === type
    },
    fieldIsDisabled(field) {
      return field.disabled || (field.updateForbidden && !this.isCreateMode())
    },
    formItemClasses(field) {
      var classes = []
      if(field.determined_by) {
        classes.push('has-dependency')
      }
      if(field.required) {
        classes.push('mandatory')
      }
      return classes
    },
    init() {
      this.cascadeInit(this.model, false, this.config.fields)
    },
    isCreateMode() {
      return this.$route.params.id === 'create'
    }
  },
  components: {
    AbstractColorPicker,
    AbstractSelect,
    AbstractMultiSelect,
    TermLookup,
    GenderSlider
  }
}
</script>

<style lang="scss">
.editor-form {
  max-width: 36rem;
  .mandatory label:after {
    content: "*";
    padding: 0.3em;
    color: red;
  }
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
