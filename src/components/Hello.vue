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
    font-family: "leitura-news", serif;
    font-weight: bold;
    font-style: italic;
    font-size: 1.25rem;
    line-height: 1.5;
    margin: 1rem 0;
  }
}
</style>
