import Vue from 'vue'
import uuid from 'uuid/v4'
import * as cascadeTypes from '@/util/cascade-types'
import { isValid } from '@/util/validators'

export default {
  data() {
    return {
      modelAlias: undefined,
      modelIsArray: undefined,
      cascadeSectorProps: [],
      cascadeMap: [],
      cascadeQueue: [],
      logOK: true
    }
  },
  methods: {
    cascadeInit(model, isArray, props) {
      this.modelAlias = model
      this.modelIsArray = isArray
      this.cascadeSectorProps = props
      if(this.modelIsArray) {
        this.cascadeMap = this.modelAlias.map(row => this.makeCascadeSectorForRow())
      } else {
        this.cascadeMap = [this.makeCascadeSectorForRow()]
      }
    },
    makeCascadeSectorForRow() {
      let sector = {}
      let props = this.cascadeSectorProps.map(propObj => ({
        [propObj.id]: {
          uuid: uuid(),
          directory: undefined,
          parameters: {}
        }
      }))
      if(props.length > 0) {
        sector = Object.assign(...props)
      }
      return sector
    },
    addCascadeSector() {
      this.cascadeMap.push(this.makeCascadeSectorForRow())
    },
    deleteCascadeSector(index) {
      this.cascadeMap.splice(index, 1)
    },
    queueCascadeUpdate(obj) {
      this.cascadeQueue.push(obj)
    },
    log(trigger, rule, sector, target) {
      if(this.logOK) {
        console.log('%ccascade', 'font-weight: bold')
        console.log('action\t', rule.action)
        console.log('source\t', trigger.id, trigger.uuid)
        console.log('sector\t', sector)
        console.log('target\t', target)
        console.log('payload\t', trigger.payload)
      }
    }
  },
  watch: {
    'cascadeQueue'() {
      while(this.cascadeQueue.length > 0) {
        let trigger = this.cascadeQueue.shift()
        for(let sectorIndex = 0; sectorIndex < this.cascadeMap.length; sectorIndex++) { // for(let sector of this.cascadeMap) {
          let sector = this.cascadeMap[sectorIndex]
          if(sector[trigger.id].uuid === trigger.uuid) {
            let correspondingModel = (this.modelIsArray ? this.modelAlias[sectorIndex] : this.modelAlias)
            for(let rule of trigger.rules) {
              for(let targetID of rule.targets) {
                this.log(trigger, rule, sector, targetID)
                if(rule.action === cascadeTypes.LOOKUP_TERM) {
                  correspondingModel[targetID] = trigger.payload ? trigger.payload[targetID] : undefined
                } else if(rule.action === cascadeTypes.APPLY_CONSTRAINT) {
                  if(!sector[targetID].hasOwnProperty('parameters')) {
                    Vue.set(sector[targetID], 'parameters', {})
                  }
                  if(isValid(trigger.payload)) {
                    Vue.set(sector[targetID].parameters, rule.constraintName, trigger.payload)
                  } else {
                    Vue.delete(sector[targetID].parameters, rule.constraintName)
                  }
                } else if(rule.action === cascadeTypes.APPOINT_DIRECTORY) {
                  Vue.set(sector[targetID], 'directory', trigger.payload ? trigger.payload : undefined)
                }
                // FIXME: remove these when payload is empty (or something)
              }
            }
          }
        }
      }
    }
  }
}
