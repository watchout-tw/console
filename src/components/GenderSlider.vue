<template>
<div class="gender-slider">
  <el-slider v-model="model" @change="push" :show-tooltip="false"></el-slider>
  <p class="status">{{ status }}</p>
</div>
</template>

<script>
export default {
  props: ['value', 'config', 'page'],
  data() {
    return {
      initialized: false,
      model: 0
    }
  },
  computed: {
    status() {
      if(this.$route.params.id === 'create') {
        this.push()
      }
      let percentage = (this.model - 50) * 2
      return percentage === 0 ? '酷兒' : `${Math.abs(percentage)}% ${(percentage < 0 ? '女性' : '男性')}`
    }
  },
  watch: {
    'value'() {
      if(!this.initialized) {
        this.pull() // pull only once at initialization
        this.initialized = true
      }
    }
  },
  methods: {
    formatter(val) {
      let state = val < 50 ? -1 : val > 50 ? 1 : 0
      let percentage = Math.abs(val - 50) * 2
      return state === 0 ? '酷兒' : `${percentage}% ${(state < 0 ? '女性' : '男性')}`
    },
    pull() { // pull data from parent
      if (typeof this.value === 'number' && this.value <= 100 && this.value >= -100) {
        this.model = this.value / 2 + 50
      } else {
        this.model = 0
      }
    },
    push() {
      this.$emit('update:value', (this.model - 50) * 2)
    }
  }
}
</script>

<style lang="scss">
.gender-slider {
  > .status {
    line-height: 1.25em;
  }
}
</style>
