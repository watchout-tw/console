<template>
<div class="editor-form">
  <el-form :label-width="labelWidth" label-position="left">
    <el-form-item v-for="field in config.fields" :key="field.id" :label="field.label" :class="formItemClasses(field)">
      <el-input v-if="fieldIs(field, 'text')" v-model="model[field.id]" :disabled="field.updateForbidden && !isCreateMode()" :placeholder="field.label"></el-input>
      <el-input v-if="fieldIs(field, 'textarea')" type="textarea" v-model="model[field.id]" :placeholder="field.label"></el-input>
      <el-input-number v-if="fieldIs(field, 'number')" v-model="model[field.id]" :disabled="field.updateForbidden && !isCreateMode()"></el-input-number>
      <el-switch v-if="fieldIs(field, 'switch')" v-model="model[field.id]" on-text="YES" off-text="NO"></el-switch>
      <abstract-color-picker v-if="fieldIs(field, 'color')" :value.sync="model[field.id]"></abstract-color-picker>
      <term-lookup v-if="fieldIs(field, 'date')" :value.sync="model[field.id]" :uuid="uuids[field.id]" :cascade-this.sync="cascadeThis" :config="field" :page="page"></term-lookup>
      <abstract-select v-if="fieldIs(field, 'select')" :value.sync="model[field.id]" :uuid="uuids[field.id]" :cascade-this.sync="cascadeThis" :config="field" :page="page"></abstract-select>
      <abstract-multi-select v-if="fieldIs(field, 'multiselect')" :value.sync="model[field.id]" :uuid="uuids[field.id]" :config="field" :page="page"></abstract-multi-select>
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

export default {
  mixins: [cascadeController],
  props: ['model', 'config', 'page'],
  computed: {
    labelWidth() {
      return this.config.options ? this.config.options.labelWidth : labelWidth(4)
    }
  },
  data() {
    return {
      cascadeList: undefined
    }
  },
  beforeMount() {
    this.init()
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
    init() {
      this.cascadeList = this.config.fields
      this.cascadeInit()
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
