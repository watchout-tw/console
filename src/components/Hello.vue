<template>
<div class="hello">
  <blockquote>{{ greeting }}<span class="emoji">🖖</span></blockquote>
</div>
</template>

<script>

export default {
  name: 'hello',
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated
    },
    citizenHandle() {
      return localStorage.getItem('watchout-citizen-handle')
    },
    greeting() {
      return 'Hello, ' + (this.citizenHandle ? this.citizenHandle : 'stranger') + '.' + ' Live long and prosper.'
    }
  },
  mounted() {
    this.showModalAuth()
  },
  methods: {
    hasQueryParameter(key) {
      return this.$route.query.hasOwnProperty(key)
    },
    showModalAuth() {
      if(!this.isAuthenticated) {
        this.$store.dispatch('toggleModalAuthActiveCard', {
          value: 'login'
        })
        this.$store.dispatch('toggleModalAuth', {
          value: true
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '~common/src/styles/resources';

.hello {
  margin: 0 1rem;
  > blockquote {
    font-weight: bold;
    font-style: italic;
    font-size: 1.25rem;
    line-height: 1.5;
    margin: 1rem 0;
  }
}
.emoji {
  display: inline-block;
  margin: 0 0.25rem;
  font-style: normal;
  font-weight: normal;
}
</style>
