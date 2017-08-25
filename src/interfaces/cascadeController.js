import Vue from 'vue'
import uuid from 'uuid/v4'
import * as cascadeTypes from '@/util/cascade-types'

function isValid(val) {
  return val !== undefined && val !== null && val !== ''
}

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
      return Object.assign(
        ...this.cascadeSectorProps.map(propObj => ({
          [propObj.id]: {
            uuid: uuid(),
            directory: undefined,
            parameters: {}
          }
        }))
      )
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
                  let constraintName = rule.constraintName
                  let parameters = sector[targetID].parameters
                  if(!parameters) {
                    parameters = {}
                  }
                  if(isValid(trigger.payload)) {
                    Vue.set(parameters, constraintName, trigger.payload)
                  } else {
                    Vue.delete(parameters, constraintName)
                  }
                } else if(rule.action === cascadeTypes.APPOINT_DIRECTORY) {
                  sector[targetID].directory = trigger.payload ? trigger.payload : undefined
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
