<template>
<div class="editor-checklist">
  <el-checkbox-group v-model="tmp" @change="handleChange">
    <el-checkbox v-for="item in checklistOptions(interface.id)" :label="item.value" :key="item.value">{{ item.label }}</el-checkbox>
  </el-checkbox-group>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['page', 'interface', 'model'],
  data() {
    return {
      initialized: false,
      tmp: []
    }
  },
  computed: {
    ...mapGetters({
      checklistOptions: 'checklistOptions'
    })
  },
  mounted() {
    this.update()
  },
  watch: {
    'page.id'() {
      this.update()
    },
    'model'() {
      if(!this.initialized) {
        for(let item of this.model) {
          this.tmp.push(item.id)
        }
        this.initialized = true
      }
    }
  },
  methods: {
    update() {
      this.$store.dispatch('updateChecklist', {
        checklistID: this.interface.id,
        directoryID: this.interface.directory
      })
      this.initialized = false
    },
    handleChange(now) {
      this.$emit('update:model', now.map(item => ({id: item})))
    }
  }
}
</script>

<style lang="scss">
.el-checkbox + .el-checkbox {
  margin-left: 0;
}
.el-checkbox {
  margin-right: 1rem;
}
</style>
