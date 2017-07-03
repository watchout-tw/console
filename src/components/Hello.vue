<template>
<div class="hello">
  <blockquote>{{ message }}</blockquote>
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
@import '~common/src/styles/resources';

.hello {
  margin: 0 1rem;
  > blockquote {
    @include font-serif;
    font-style: italic;
    font-size: 2rem;

  }
}
</style>
