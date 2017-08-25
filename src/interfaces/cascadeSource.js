export default {
  props: ['cascadeConfig', 'queueCascadeUpdate'],
  computed: {
    uuid() {
      return this.cascadeConfig.uuid
    },
    parameters() {
      return this.cascadeConfig.parameters
    },
    directory() {
      return this.cascadeConfig.directory || this.config.directory
    }
  },
  methods: {
    triggerCascade(uuid, id, rules, payload) {
      if(this.queueCascadeUpdate) {
        this.queueCascadeUpdate({
          uuid,
          id,
          rules,
          payload
        })
      }
    }
  }
}
