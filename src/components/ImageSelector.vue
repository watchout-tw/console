<template>
<div class="image-selector">
  <div v-if="isUrlmode">
    <el-input v-model="url" @change="push()" placeholder="請輸入圖片網址">
      <el-button slot="append" @click="isUrlmode = !isUrlmode">或選取圖片</el-button>
    </el-input>
    <img :src="url" />
  </div>
  <div v-if="!isUrlmode">
    <input type=file @change="imageToBase64(this.files)" ref="localImage" />
    <el-button type="primary" @click="openFile()">選擇圖片</el-button>
    <el-button slot="append" @click="isUrlmode = !isUrlmode">或輸入圖片網址</el-button>
    <img :src="localImageFile" />
  </div>
</div>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      initialized: false,
      base64: '',
      localImageFile: '',
      url: '',
      isUrlmode: true
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
        this.pull()
        this.initialized = true
      }
    }
  },
  methods: {
    imageToBase64() {
      var reader = new FileReader()
      reader.onloadend = () => {
        let result = reader.result
        this.localImageFile = result
        this.base64 = reader.result.slice(result.indexOf('base64') + 6, result.length)
        this.push()
      }
      reader.readAsDataURL(this.$refs.localImage.files[0])
    },
    openFile() {
      this.$refs.localImage.click()
    },
    pull() { // only accept url value
      this.url = this.value
    },
    push() {
      let pushData = this.isUrlmode ? this.url : this.localImageFile
      this.$emit('update:value', pushData)
    }
  }
}
</script>

<style lang="scss">
.image-selector {
  input[type=file]{
    display: none;
  }
}
</style>
