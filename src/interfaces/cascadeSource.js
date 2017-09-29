export default {
  props: ['cascadeConfig', 'queueCascadeUpdate'],
  computed: {
    uuid() {
      // use directory name as uuid to share options among components which cascadeUpdate are not enabled
      return this.cascadeConfig ? this.cascadeConfig.uuid : this.config.directory
    },
    parameters() {
      return this.cascadeConfig ? this.cascadeConfig.parameters : {}
    },
    directory() {
      // cascadeConfig.directory will override config.directory if exists
      return this.cascadeConfig && this.cascadeConfig.directory ? this.cascadeConfig.directory : this.config.directory
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
