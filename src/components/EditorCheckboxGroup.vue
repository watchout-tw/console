<template>
<div class="editor-checkbox-group">

</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['source'],
  data() {
    return {
      value: undefined
    }
  },
  computed: {
    ...mapGetters({
      options: 'options'
    })
  }
}
</script>
