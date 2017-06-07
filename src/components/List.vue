<template>
<div class="list">
  <h1>{{ title }}</h1>
  <div v-if="withFilter">filter</div>
</div>
</template>

<script>
export default {
  props: ['title', 'withFilter'],
  methods: {
  }
}
</script>
