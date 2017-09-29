<template>
<div class="editor-events">
  <div class="new-event event-editor">
    <div class="section event-id">{{ newEvent.uuid }}</div>
    <div class="section event-properties d-flex">
      <abstract-select :value.sync="newEvent.status" :config="eventProps.status" :page="page"></abstract-select>
      <el-input v-model="newEvent.slug" :placeholder="eventProps.slug.label" style="width:auto"></el-input>
      <el-date-picker v-model="newEvent.date" :placeholder="eventProps.date.label" type="date"></el-date-picker>
      <abstract-select :value.sync="newEvent.type" :config="eventProps.type" :page="page"></abstract-select>
    </div>
    <div class="section event-content">
      <el-input v-model="newEvent.image" :placeholder="eventProps.image.label"></el-input>
      <el-input v-model="newEvent.tagline" :placeholder="eventProps.tagline.label"></el-input>
      <el-input v-model="newEvent.title" :placeholder="eventProps.title.label"></el-input>
      <el-input v-model="newEvent.content" :placeholder="eventProps.content.label" type="textarea"></el-input>
    </div>
    <div class="section actions">
      <el-button type="primary" @click="submitNewEvent">新增事件</el-button>
    </div>
  </div>
  <div class="events">
    <div class="event" v-for="(event, $index) in events" :key="event.uuid">
      {{ event.uuid }}
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import uuid from 'uuid/v4'
import AbstractSelect from '@/components/AbstractSelect'

export default {
  props: ['events', 'config', 'page', 'parentInitialized'],
  data() {
    return {
      initialized: false,
      eventProps: require('@/config/eventProps').default,
      newEvent: {},
      flags: []
    }
  },
  beforeMount() {
    this.init()
    // FIXME: might need something like EditorTable--asyncInit & parentInitialized watcher
    Vue.set(this, 'newEvent', this.makeEvent())
  },
  methods: {
    attributeIs(attribute, type) {
      return attribute.type === type
    },
    init() {
      this.initialized = true // FIXME: might have to move this to asyncInit like EditorTable
    },
    makeEvent() {
      let event = {
        uuid: uuid()
      }
      return Object.assign(event,
        ...Object.keys(this.eventProps).map(key => ({[this.eventProps[key].id]: undefined}))
      )
    },
    submitNewEvent() {
      // add newEvent to the list of events
      // make a newEvent
    }
  },
  components: {
    AbstractSelect
  }
}
</script>

<style lang="scss">
@import '~common/src/styles/resources';

.event-editor {
  max-width: 36rem;
  > .section + .section {
    margin-top: 0.5rem;
  }
  > .event-id {
    font-size: 0.625rem;
    color: $color-secondary-text-grey;
  }

  > .event-properties {
    > * + * {
      margin-left: 0.5rem;
    }
  }
  > .event-content {
    > * + * {
      margin-top: 0.5rem;
    }
  }
}
</style>
