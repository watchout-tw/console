<template>
<div class="gender-slider">
  <el-slider v-model="tmp" @change="handleChange" :show-tooltip="false"></el-slider>
  <p class="status">{{ status }}</p>
</div>
</template>

<script>
export default {
  props: ['value', 'config', 'page'],
  data() {
    return {
      tmp: undefined
    }
  },
  computed: {
    status() {
      let percentage = (this.tmp - 50) * 2
      return percentage === 0 ? '酷兒' : `${Math.abs(percentage)}% ${(percentage < 0 ? '女性' : '男性')}`
    }
  },
  methods: {
    formatter(val) {
      let state = val < 50 ? -1 : val > 50 ? 1 : 0
      let percentage = Math.abs(val - 50) * 2
      return state === 0 ? '酷兒' : `${percentage}% ${(state < 0 ? '女性' : '男性')}`
    },
    handleChange() {
      this.$emit('update:value', (this.tmp - 50) * 2)
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
