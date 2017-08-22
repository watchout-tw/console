<template>
<div class="editor-events">
  <el-button type="primary" @click="createEvent()">新增事件</el-button>
  <div class="event" v-for="event in model" key="event.uuid">
    {{ event.uuid }}
  </div>
</div>
</template>

<script>
import uuid from 'uuid/v4'

export default {
  props: ['value', 'config', 'page'],
  data() {
    return {
      model: []
    }
  },
  methods: {
    pull() {
    },
    push() {
    },
    createEvent() {
      this.model.push({
        uuid: uuid()
      })
    }
  }
}
</script>
