<template>
<div class="editor-events">
  <el-button type="primary" @click="createEvent">新增事件</el-button>
  <div class="event" v-for="event in events" key="event.uuid">
    {{ event.uuid }}
    <template v-for="attribute in config.attributes">
      <el-input v-if="attributeIs(attribute, 'text')" v-model="event[attribute.id]" :placeholder="attribute.label"></el-input>
      <el-input v-if="attributeIs(attribute, 'textarea')" type="textarea" v-model="event[attribute.id]" :placeholder="attribute.label"></el-input>
      <abstract-select v-if="attributeIs(attribute, 'select')" :value.sync="event[attribute.id]" :uuid="uuids[event.uuid][attribute.id]" :cascade-this.sync="cascadeThis" :config="attribute" :page="page"></abstract-select>
    </template>
  </div>
</div>
</template>

<script>
import uuid from 'uuid/v4'
// FIXME: cascadeController?
import AbstractSelect from '@/components/AbstractSelect'

export default {
  props: ['model', 'config', 'page'],
  data() {
    return {
      events: [],
      uuids: {},
      cascadeThis: {} // FIXME: temp
    }
  },
  methods: {
    attributeIs(attribute, type) {
      return attribute.type === type
    },
    pull() {
    },
    push() {
    },
    createEvent() {
      let eventID = uuid()
      let event = {
        uuid: eventID
      }
      this.events.push(Object.assign(
        event,
        ...this.config.attributes.map(attribute => ({[attribute.id]: undefined})))
      )
      this.uuids[eventID] = Object.assign(...this.config.attributes.map(
        attribute => ({[attribute.id]: uuid()})
      ))
    }
  },
  components: {
    AbstractSelect
  }
}
</script>
