<template>
<div class="hello">
  <div class="title"><h1 class="small">Hello.</h1></div>
  <p>{{ message }}</p>
</div>
</template>

<script>

export default {
  name: 'hello',
  data () {
    return {
      message: 'Welcome to Watchout Commons Console'
    }
  }
}
</script>

<style lang="scss">
.hello {
  margin: 0 1rem;
  > .title {
    margin: 1rem 0;
  }
}
</style>
