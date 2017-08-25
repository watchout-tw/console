<template>
<div class="editor-events">
  <el-button type="primary" @click="addEvent">新增事件</el-button>
  <div class="events">
    <div class="event" v-for="(event, $index) in events" key="event.uuid">
      <label>{{ event.uuid }}</label>
      <div v-for="attribute in config.attributes" :key="attribute.id" :class="attribute.id">
        <el-input v-if="attributeIs(attribute, 'text')" v-model="event[attribute.id]" :placeholder="attribute.label"></el-input>
        <el-input v-if="attributeIs(attribute, 'textarea')" type="textarea" v-model="event[attribute.id]" :placeholder="attribute.label"></el-input>
        <el-date-picker v-if="attributeIs(attribute, 'date')" type="date" v-model="event[attribute.id]" :placeholder="attribute.label"></el-date-picker>
        <abstract-select v-if="attributeIs(attribute, 'select')" :value.sync="event[attribute.id]" :cascadeConfig="cascadeMap[$index][attribute.id]" :queueCascadeUpdate="queueCascadeUpdate" :config="attribute" :page="page"></abstract-select>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import uuid from 'uuid/v4'
import AbstractSelect from '@/components/AbstractSelect'
import cascadeController from '@/interfaces/cascadeController'

export default {
  mixins: [cascadeController],
  props: ['events', 'config', 'page', 'parentInitialized'],
  data() {
    return {
      initialized: false
    }
  },
  beforeMount() {
    this.init()
    // FIXME: might need something like EditorTable--asyncInit & parentInitialized watcher
  },
  methods: {
    attributeIs(attribute, type) {
      return attribute.type === type
    },
    init() {
      this.cascadeInit(this.events, true, this.config.attributes)
      this.initialized = true // FIXME: might have to move this to asyncInit like EditorTable
    },
    addEvent() {
      let eventID = uuid()
      let event = {
        uuid: eventID
      }
      this.events.push(Object.assign(
        event,
        ...this.config.attributes.map(attribute => ({[attribute.id]: undefined})))
      )
      this.addCascadeSector()
    }
  },
  components: {
    AbstractSelect
  }
}
</script>

<style lang="scss">
.events > .event {
  max-width: 16rem;
}
</style>
