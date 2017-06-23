<template>
<div class="editor-checkbox-group">
  <el-checkbox-group v-model="values">
    <el-checkbox v-for="item in options(source.api)" :label="item.label" :key="item.value"></el-checkbox>
  </el-checkbox-group>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['source'],
  data() {
    return {
      values: []
    }
  },
  computed: {
    ...mapGetters({
      options: 'options'
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
      this.$store.dispatch('updateSelectedFilter', {
        filterID: this.source.api
      })
    }
  }
}
</script>
