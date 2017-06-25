<template>
<div class="editor-checklist">
  <el-checkbox-group v-model="values">
    <el-checkbox v-for="item in checklistOptions(interface.id)" :label="item.label" :key="item.value"></el-checkbox>
  </el-checkbox-group>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['page', 'interface'],
  data() {
    return {
      values: []
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
    }
  },
  methods: {
    update() {
      this.$store.dispatch('updateChecklist', {
        checklistID: this.interface.id,
        directoryID: this.interface.directory
      })
    }
  }
}
</script>
