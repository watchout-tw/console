<template>
<div class="hello">
  <div class="title"><h1 class="small">{{ message }}</h1></div>
</div>
</template>

<script>

export default {
  name: 'hello',
  data () {
    return {
      message: 'Hello, Dave.'
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
