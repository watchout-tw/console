import uuid from 'uuid/v4'
import * as cascadeTypes from '@/util/cascade-types'

export default {
  data() {
    return {
      uuids: {},
      cascadeVectors: {}, // {uuid: [cascadeObj]}
      cascadeThis: {} // {uuid, value, alias}
    }
  },
  watch: {
    'cascadeThis'() {
      this.cascade()
    }
  },
  methods: {
    cascadeInit() {
      // set UUIDs
      this.cascadeList.forEach(item => {
        this.$set(this.uuids, item.id, uuid()) // generate UUID for each filter
      })

      // prepare cascadeVectors
      this.cascadeList.forEach(item => {
        if(item.cascadeUpdate) {
          let itemUUID = this.uuids[item.id]
          if(!this.cascadeVectors[itemUUID]) {
            this.$set(this.cascadeVectors, itemUUID, [])
          }
          this.cascadeVectors[itemUUID].push(
            ...item.cascadeUpdate.map(vector => {
              return Object.assign(vector, {
                targetObjects: vector.targets.map(target => {
                  return {
                    id: target,
                    uuid: this.uuids[target]
                  }
                })
              }) // this updates config.cascadeUpdate of children element as well
            })
          )
        }
      })
    },
    cascade() {
      let vectors = this.cascadeVectors[this.cascadeThis.fromID]
      if(vectors) {
        vectors.forEach(vector => {
          if(vector.action === cascadeTypes.APPOINT_DIRECTORY) { // FIXME: this assumes controller is List
            vector.targetObjects.forEach(targetObj => {
              // change config instead and let Vue do the updating
              this.cascadeList
                .filter(item => item.id === targetObj.id)
                .forEach(item => {
                  this.$set(item, 'directory', this.cascadeThis.value) // use $set to trigger update in case directory is not set
                })
            })
          } else if(vector.action === cascadeTypes.LOOKUP_TERM) { // FIXME: this assumes controller is EditorForm
            vector.targetObjects
              .filter(targetObj => targetObj.id === 'term_index')
              .forEach(targetObj => {
                let value = this.cascadeThis.value
                this.model.term_index = value ? value.term_index : undefined
              })

            vector.targetObjects
              .filter(targetObj => targetObj.id === 'session_index')
              .forEach(targetObj => {
                let value = this.cascadeThis.value
                this.cascadeList
                  .filter(item => item.id === 'session_index')
                  .forEach(item => {
                    if(value) {
                      this.$set(item, 'parameters', {
                        term: value.term_index
                      })
                    } else {
                      this.$delete(item.parameters, 'term')
                    }
                  })
                this.model.session_index = value ? value.session_index : undefined
              })

            vector.targetObjects
              .filter(targetObj => targetObj.id === 'temp_session_index')
              .forEach(targetObj => {
                let value = this.cascadeThis.value
                this.model.temp_session_index = value ? value.temp_session_index : undefined
              })
          }
        })
      }
    }
  }
}
