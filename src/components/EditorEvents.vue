<template>
<div class="editor-events">
  <el-form v-show="eventEditing" :label-width="labelWidth" label-position="left">
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
      <el-form-item v-if="visibility.term_index" :label="eventProps.term_index.label">
        <el-input-number v-model="newEvent.data.term_index"></el-input-number>
      </el-form-item>
      <el-form-item v-if="visibility.session_index" :label="eventProps.session_index.label">
        <el-input-number v-model="newEvent.data.session_index"></el-input-number>
      </el-form-item>
      <el-form-item v-if="visibility.temp_session_index" :label="eventProps.temp_session_index.label">
        <el-input-number v-model="newEvent.data.temp_session_index"></el-input-number>
      </el-form-item>
      <el-form-item v-if="visibility.reps" :label="eventProps.reps.label">
        <abstract-multi-select :value.sync="newEvent.data.reps" :config="eventProps.reps" :page="page"></abstract-multi-select>
      </el-form-item>
      <el-form-item v-if="visibility.rs_votes" :label="eventProps.rs_votes.label">
        <abstract-multi-select :value.sync="newEvent.data.rs_votes" :config="eventProps.rs_votes" :page="page"></abstract-multi-select>
      </el-form-item>
      <el-form-item v-if="visibility.data_reports" :label="eventProps.data_reports.label">
        <abstract-multi-select :value.sync="newEvent.data.data_reports" :config="eventProps.data_reports" :page="page"></abstract-multi-select>
      </el-form-item>
      <el-form-item v-if="visibility.insights" :label="eventProps.insights.label">
        <abstract-multi-select :value.sync="newEvent.data.insights" :config="eventProps.insights" :page="page"></abstract-multi-select>
      </el-form-item>
    </div>
  </div>
  </el-form>
  <div class="section actions" v-show="eventEditing">
    <el-button type="text">儲存</el-button>
    <el-button type="text" @click="cancelNewEvent()">取消</el-button>
  </div>
  <div class="section actions" v-show="!eventEditing">
    <el-button type="primary" @click="createNewEvent()">新增事件</el-button>
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
import AbstractMultiSelect from '@/components/AbstractMultiSelect'
import { labelWidth } from '@/util/element'

export default {
  props: ['events', 'config', 'page', 'parentInitialized'],
  computed: {
    labelWidth() {
      return this.config.options ? this.config.options.labelWidth : labelWidth(4)
    }
  },
  data() {
    return {
      initialized: false,
      eventProps: require('@/config/eventProps').default,
      newEvent: {
        data: {}
      },
      flags: [],
      visibility: {},
      eventEditing: false
    }
  },
  beforeMount() {
    this.init()
    // FIXME: might need something like EditorTable--asyncInit & parentInitialized watcher
    Vue.set(this, 'newEvent', this.makeEvent())
  },
  watch: {
    'newEvent.type' (to, from) {
      this.visibility = {}
      this.newEvent.data = {}
      switch (to) {
        case 'term_start':
          this.visibility.term_index = true
          Vue.set(this.newEvent.data, 'term_index', 0)
          break

        case 'session_start':
          this.visibility.term_index = true
          this.visibility.session_index = true
          this.visibility.temp_session_index = true
          Vue.set(this.newEvent.data, 'term_index', 0)
          Vue.set(this.newEvent.data, 'session_index', 0)
          Vue.set(this.newEvent.data, 'temp_session_index', 0)
          break

        case 'reps_assume_office':
          this.visibility.reps = true
          Vue.set(this.newEvent.data, 'reps', [])
          break

        case 'rs_statements':
          // TODO: filters for this should be done
          this.visibility.rs_statements = true
          break

        case 'rs_bills':
          // TODO: filters for this should be done
          this.visibility.rs_bills = true
          break

        case 'bill_legislative_step':
          // TODO: should be done after rs_bills is done
          this.visibility.bill_legislative_step = true
          break

        case 'rs_votes':
          this.visibility.rs_votes = true
          Vue.set(this.newEvent.data, 'rs_votes', [])
          break

        case 'data_reports':
          this.visibility.data_reports = true
          Vue.set(this.newEvent.data, 'data_reports', [])
          break

        case 'insights':
          this.visibility.insights = true
          Vue.set(this.newEvent.data, 'insights', [])
          break

        case 'social_event':
          // TODO: to be discuss
          this.visibility.social_event = true
          break

        case 'general_update':
          // TODO: to be discuss
          this.visibility.general_update = true
          break
      }
    }
  },
  methods: {
    attributeIs (attribute, type) {
      return attribute.type === type
    },
    init () {
      this.initialized = true // FIXME: might have to move this to asyncInit like EditorTable
    },
    makeEvent () {
      let event = {
        uuid: uuid()
      }
      return Object.assign(event,
        ...Object.keys(this.eventProps).map(key => ({[this.eventProps[key].id]: undefined}))
      )
    },
    submitNewEvent () {
      // add newEvent to the list of events
      // make a newEvent
    },
    createNewEvent () {
      this.eventEditing = true
    },
    cancelNewEvent () {
      this.eventEditing = false
    }
  },
  components: {
    AbstractSelect,
    AbstractMultiSelect
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
