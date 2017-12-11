export default {
  data() {
    return {
      errorMsg: null
    }
  },
  methods: {
    showError (error) {
      this.errorMsg = error.response.data.message
    },
    hideError () {
      this.errorMsg = null
    }
  }
}
